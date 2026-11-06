import { createServer } from "node:http";
import { existsSync, readFileSync } from "node:fs";
import { spawn } from "node:child_process";
import { randomBytes } from "node:crypto";
import { URL } from "node:url";

const port = Number(process.env.OAUTH_PORT || "53682");
const callbackPath = "/oauth2callback";
const redirectUri =
  process.env.OAUTH_REDIRECT_URI ||
  `http://127.0.0.1:${port}${callbackPath}`;
const scope = "https://mail.google.com/";

function parseEnvFile(filePath) {
  if (!existsSync(filePath)) return {};

  const values = {};
  for (const line of readFileSync(filePath, "utf8").split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (!match) continue;

    let value = match[2];
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    values[match[1]] = value.replace(/\\n/g, "\n");
  }
  return values;
}

const env = {
  ...parseEnvFile(".env"),
  ...parseEnvFile(".env.local"),
  ...process.env,
};

function required(name) {
  const value = env[name]?.trim();
  if (!value) {
    throw new Error(`Missing ${name}. Add it to .env or .env.local first.`);
  }
  return value;
}

function openBrowser(url) {
  const command =
    process.platform === "win32"
      ? "explorer.exe"
      : process.platform === "darwin"
        ? "open"
        : "xdg-open";

  const child = spawn(command, [url], {
    detached: true,
    stdio: "ignore",
  });
  child.unref();
}

function closeServer(server, exitCode) {
  server.close(() => process.exit(exitCode));
  setTimeout(() => process.exit(exitCode), 2000).unref();
}

let clientId;
let clientSecret;
try {
  clientId = required("SMTP_CLIENT_ID");
  clientSecret = required("SMTP_CLIENT_SECRET");
} catch (error) {
  console.error(error.message);
  process.exit(1);
}

const state = randomBytes(24).toString("hex");
const authorizationUrl = new URL(
  "https://accounts.google.com/o/oauth2/v2/auth"
);
authorizationUrl.search = new URLSearchParams({
  client_id: clientId,
  redirect_uri: redirectUri,
  response_type: "code",
  scope,
  access_type: "offline",
  prompt: "consent",
  state,
}).toString();

const server = createServer(async (request, response) => {
  const requestUrl = new URL(
    request.url || "/",
    `http://127.0.0.1:${port}`
  );

  if (requestUrl.pathname !== callbackPath) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  if (requestUrl.searchParams.get("state") !== state) {
    response.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Invalid OAuth state. You can close this window.");
    console.error("OAuth state validation failed.");
    closeServer(server, 1);
    return;
  }

  const error = requestUrl.searchParams.get("error");
  if (error) {
    response.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Google authorization was cancelled. You can close this window.");
    console.error(`Google authorization failed: ${error}`);
    closeServer(server, 1);
    return;
  }

  const code = requestUrl.searchParams.get("code");
  if (!code) {
    response.writeHead(400, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("No authorization code received. You can close this window.");
    console.error("Google did not return an authorization code.");
    closeServer(server, 1);
    return;
  }

  response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  response.end(
    "<h2>Authorization complete</h2><p>You can close this browser tab and return to the terminal.</p>"
  );

  try {
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        grant_type: "authorization_code",
        redirect_uri: redirectUri,
      }),
    });

    const tokenBody = await tokenResponse.json();
    if (!tokenResponse.ok) {
      throw new Error(
        tokenBody.error_description || tokenBody.error || "Token exchange failed."
      );
    }

    if (!tokenBody.refresh_token) {
      throw new Error(
        "Google did not return a refresh token. Revoke the app access and run the script again."
      );
    }

    console.log("\nRefresh token generated successfully:\n");
    console.log(tokenBody.refresh_token);
    console.log("\nAdd this line to .env, then restart the server:\n");
    console.log(`SMTP_REFRESH_TOKEN=${tokenBody.refresh_token}\n`);
    closeServer(server, 0);
  } catch (exchangeError) {
    console.error(`\n${exchangeError.message}`);
    closeServer(server, 1);
  }
});

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`Port ${port} is already in use. Stop that process and try again.`);
  } else {
    console.error(error.message);
  }
  process.exit(1);
});

server.listen(port, "127.0.0.1", () => {
  console.log(`OAuth callback listening at ${redirectUri}`);
  console.log("Opening Google authorization in your browser...\n");
  console.log("If it does not open automatically, visit this URL:\n");
  console.log(authorizationUrl.toString());
  openBrowser(authorizationUrl.toString());
});
