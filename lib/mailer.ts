import nodemailer from "nodemailer";

function required(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function optional(name: string): string | undefined {
  const value = process.env[name]?.trim();
  return value || undefined;
}

type PasswordAuth = {
  type: "password";
  user: string;
  pass: string;
};

type OAuth2Auth = {
  type: "oauth2";
  user: string;
  clientId: string;
  clientSecret: string;
  refreshToken: string;
};

type MailAuth = PasswordAuth | OAuth2Auth;

export type MailConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  from: string;
  to: string;
  auth: MailAuth;
};

function getAuthMode(): "password" | "oauth2" {
  const configuredMode = optional("SMTP_AUTH")?.toLowerCase();

  if (configuredMode && !["password", "oauth2"].includes(configuredMode)) {
    throw new Error('Invalid SMTP_AUTH. Use "oauth2" or "password".');
  }

  const hasOAuthSetting = Boolean(
    optional("SMTP_CLIENT_ID") ||
      optional("SMTP_CLIENT_SECRET") ||
      optional("SMTP_REFRESH_TOKEN")
  );

  return configuredMode === "oauth2" || hasOAuthSetting ? "oauth2" : "password";
}

export function getMailConfig() {
  const port = Number(process.env.SMTP_PORT || "465");
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("Invalid SMTP_PORT. Use a valid port number.");
  }

  const user = required("SMTP_USER");
  const authMode = getAuthMode();
  const auth: MailAuth =
    authMode === "oauth2"
      ? {
          type: "oauth2",
          user,
          clientId: required("SMTP_CLIENT_ID"),
          clientSecret: required("SMTP_CLIENT_SECRET"),
          refreshToken: required("SMTP_REFRESH_TOKEN"),
        }
      : {
          type: "password",
          user,
          pass: required("SMTP_PASS"),
        };

  return {
    host: required("SMTP_HOST"),
    port,
    secure: process.env.SMTP_SECURE
      ? process.env.SMTP_SECURE.trim().toLowerCase() === "true"
      : port === 465,
    user,
    from: optional("SMTP_FROM") || user,
    to: required("CONTACT_TO_EMAIL"),
    auth,
  };
}

export function createTransporter() {
  const config = getMailConfig();

  const auth =
    config.auth.type === "oauth2"
      ? {
          type: "OAuth2" as const,
          user: config.auth.user,
          clientId: config.auth.clientId,
          clientSecret: config.auth.clientSecret,
          refreshToken: config.auth.refreshToken,
        }
      : {
          user: config.auth.user,
          pass: config.auth.pass,
        };

  return {
    config,
    transporter: nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth,
    }),
  };
}
