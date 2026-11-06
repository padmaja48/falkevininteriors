import { NextResponse } from "next/server";
import {
  buildCustomerEmail,
  buildOwnerEmail,
  type ContactLead,
} from "@/lib/contact-email";
import { createTransporter } from "@/lib/mailer";

export const runtime = "nodejs";

function normalizeLead(body: Record<string, unknown>): ContactLead | null {
  const name = String(body.name ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const email = String(body.email ?? "").trim();
  const projectType = String(body.projectType ?? "").trim();
  const location = String(body.location ?? "").trim();
  const date = String(body.date ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!name || !phone || !email || !projectType || !location) {
    return null;
  }

  return { name, phone, email, projectType, location, date, message };
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const lead = normalizeLead(body ?? {});

    if (!lead) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    const digits = lead.phone.replace(/\D/g, "");
    if (digits.length < 10) {
      return NextResponse.json(
        { ok: false, error: "Invalid phone number." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
      return NextResponse.json(
        { ok: false, error: "Invalid email address." },
        { status: 400 }
      );
    }

    const { transporter, config } = createTransporter();
    const ownerMail = buildOwnerEmail(lead);
    const customerMail = buildCustomerEmail(lead);

    // Notify studio inbox with all form fields
    await transporter.sendMail({
      from: config.from,
      to: config.to,
      replyTo: lead.email,
      subject: ownerMail.subject,
      text: ownerMail.text,
      html: ownerMail.html,
    });

    // Confirmation reply to the customer
    await transporter.sendMail({
      from: config.from,
      to: lead.email,
      replyTo: config.to,
      subject: customerMail.subject,
      text: customerMail.text,
      html: customerMail.html,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] email failed", error);
    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error && error.message.startsWith("Missing required")
            ? "Email is not configured. Please try WhatsApp or call us."
            : "Could not send your enquiry. Please try WhatsApp or call us.",
      },
      { status: 500 }
    );
  }
}
