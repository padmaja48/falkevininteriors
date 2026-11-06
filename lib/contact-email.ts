import { siteConfig } from "@/content/site.config";

export type ContactLead = {
  name: string;
  phone: string;
  email: string;
  projectType: string;
  location: string;
  date: string;
  message: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function row(label: string, value: string): string {
  const display = value.trim() ? escapeHtml(value.trim()) : "—";
  return `
    <tr>
      <td style="padding:12px 16px;border-bottom:1px solid #e8e2d6;font-family:Georgia,'Times New Roman',serif;font-size:13px;letter-spacing:0.06em;text-transform:uppercase;color:#6b635b;width:34%;vertical-align:top;">
        ${escapeHtml(label)}
      </td>
      <td style="padding:12px 16px;border-bottom:1px solid #e8e2d6;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.5;color:#1a1a1a;vertical-align:top;">
        ${display}
      </td>
    </tr>`;
}

function shell(opts: {
  eyebrow: string;
  title: string;
  intro: string;
  bodyHtml: string;
  footerNote: string;
}): string {
  const { company, tagline } = siteConfig;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(opts.title)}</title>
</head>
<body style="margin:0;padding:0;background:#f6f3ec;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f6f3ec;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border:1px solid #e8e2d6;">
          <tr>
            <td style="padding:28px 28px 20px;border-bottom:1px solid #e8e2d6;background:#12261f;">
              <p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#c5a059;">
                ${escapeHtml(opts.eyebrow)}
              </p>
              <h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:24px;font-weight:400;line-height:1.3;color:#ffffff;">
                ${escapeHtml(opts.title)}
              </h1>
              <p style="margin:10px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:rgba(255,255,255,0.72);">
                ${escapeHtml(company)} · ${escapeHtml(tagline)}
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px;">
              <p style="margin:0 0 20px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.65;color:#1a1a1a;">
                ${escapeHtml(opts.intro)}
              </p>
              ${opts.bodyHtml}
              <p style="margin:24px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.6;color:#6b635b;white-space:pre-line;">
                ${escapeHtml(opts.footerNote)}
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:18px 28px;background:#f6f3ec;border-top:1px solid #e8e2d6;">
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.55;color:#6b635b;">
                ${escapeHtml(siteConfig.contact.address.full)}<br />
                ${escapeHtml(siteConfig.contact.phone)}
                ${siteConfig.contact.phoneSecondary ? ` · ${escapeHtml(siteConfig.contact.phoneSecondary)}` : ""}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function fieldsTable(lead: ContactLead): string {
  return `
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #e8e2d6;border-collapse:collapse;">
      ${row("Name", lead.name)}
      ${row("Phone", lead.phone)}
      ${row("Email", lead.email)}
      ${row("Project type", lead.projectType)}
      ${row("Property location", lead.location)}
      ${row("Preferred visit date", lead.date || "Not specified")}
      ${row("Message", lead.message || "No additional message")}
    </table>`;
}

function plainFields(lead: ContactLead): string {
  return [
    `Name: ${lead.name}`,
    `Phone: ${lead.phone}`,
    `Email: ${lead.email}`,
    `Project type: ${lead.projectType}`,
    `Property location: ${lead.location}`,
    `Preferred visit date: ${lead.date || "Not specified"}`,
    `Message: ${lead.message || "No additional message"}`,
  ].join("\n");
}

export function buildOwnerEmail(lead: ContactLead) {
  const subject = `New consultation request — ${lead.name} (${lead.projectType})`;
  const html = shell({
    eyebrow: "New website enquiry",
    title: "Book a consultation",
    intro: `A new consultation request was submitted on the Falkevin website. Details are below.`,
    bodyHtml: fieldsTable(lead),
    footerNote:
      "Reply directly to this email to respond to the customer (Reply-To is set to their address).",
  });
  const text = [
    "New consultation request from the Falkevin website",
    "",
    plainFields(lead),
    "",
    "Reply to this email to contact the customer.",
  ].join("\n");

  return { subject, html, text };
}

export function buildCustomerEmail(lead: ContactLead) {
  const firstName = lead.name.trim().split(/\s+/)[0] || lead.name;
  const subject = `We received your enquiry — ${siteConfig.company}`;
  const html = shell({
    eyebrow: "Thank you",
    title: "Your enquiry is with us",
    intro: `Dear ${firstName}, thank you for contacting ${siteConfig.company}. We have received your consultation request and will respond within one business day.`,
    bodyHtml: `
      <p style="margin:0 0 12px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#6b635b;letter-spacing:0.08em;text-transform:uppercase;">
        Your request summary
      </p>
      ${fieldsTable(lead)}
      <p style="margin:20px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.65;color:#1a1a1a;">
        For a quicker reply, you can also WhatsApp us on ${escapeHtml(siteConfig.contact.phone)}.
      </p>`,
    footerNote: `Warm regards,\n${siteConfig.contactPerson}\n${siteConfig.company}`,
  });
  const text = [
    `Dear ${firstName},`,
    "",
    `Thank you for contacting ${siteConfig.company}. We have received your consultation request and will respond within one business day.`,
    "",
    "Your request summary",
    plainFields(lead),
    "",
    `For a quicker reply, WhatsApp us on ${siteConfig.contact.phone}.`,
    "",
    "Warm regards,",
    siteConfig.contactPerson,
    siteConfig.company,
  ].join("\n");

  return { subject, html, text };
}
