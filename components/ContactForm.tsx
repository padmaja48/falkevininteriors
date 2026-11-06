"use client";

import { FormEvent, useId, useState } from "react";
import { getWhatsAppUrl, siteConfig } from "@/content/site.config";
import { cn } from "@/lib/utils";

const projectTypes = [
  "Blinds",
  "Curtains",
  "Wallpaper",
  "WPVC Panels",
  "Louvers",
  "Wooden / Laminate Flooring",
  "Modular Kitchen",
  "Complete Interior Fitting",
  "Glass Film",
  "Sofa / Wooden Work",
  "Other",
] as const;

type FormState = {
  name: string;
  phone: string;
  email: string;
  projectType: string;
  location: string;
  date: string;
  message: string;
};

const initial: FormState = {
  name: "",
  phone: "",
  email: "",
  projectType: "",
  location: "",
  date: "",
  message: "",
};

export function ContactForm() {
  const formId = useId();
  const [values, setValues] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {}
  );
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>(
    {}
  );
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) {
      setErrors((e) => {
        const next = { ...e };
        delete next[key];
        return next;
      });
    }
  }

  function validate(showAll = true): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!values.name.trim()) next.name = "Please enter your name.";
    if (!values.phone.trim() || values.phone.replace(/\D/g, "").length < 10) {
      next.phone = "Enter a valid 10-digit phone number.";
    }
    if (
      !values.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)
    ) {
      next.email = "Enter a valid email address.";
    }
    if (!values.projectType) next.projectType = "Select what you need help with.";
    if (!values.location.trim()) next.location = "Enter the property location.";
    if (showAll) setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setTouched({
      name: true,
      phone: true,
      email: true,
      projectType: true,
      location: true,
    });
    if (!validate()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setValues(initial);
      setTouched({});
      setErrors({});
    } catch {
      setStatus("error");
    }
  }

  function field(
    id: keyof FormState,
    label: string,
    input: React.ReactNode,
    hint?: string
  ) {
    const error = touched[id] ? errors[id] : undefined;

    return (
      <div className="space-y-2">
        <label
          htmlFor={`${formId}-${id}`}
          className="font-body text-[0.6875rem] uppercase tracking-[0.14em] text-deep"
        >
          {label}
        </label>
        <div
          className={cn(
            "[&_input]:w-full [&_select]:w-full [&_textarea]:w-full",
            error &&
              "[&_input]:border-red-800/50 [&_select]:border-red-800/50 [&_textarea]:border-red-800/50"
          )}
        >
          {input}
        </div>
        {hint && !error && (
          <p
            id={`${formId}-${id}-hint`}
            className="font-body text-xs text-muted"
          >
            {hint}
          </p>
        )}
        {error && (
          <p
            id={`${formId}-${id}-error`}
            role="alert"
            className="font-body text-sm text-red-800"
          >
            {error}
          </p>
        )}
      </div>
    );
  }

  const inputClass = cn(
    "min-h-12 border border-deep/15 bg-background px-4 py-3.5 font-body text-base text-deep outline-none transition-[border-color,box-shadow] duration-300",
    "placeholder:text-muted/60",
    "focus:border-accent focus:shadow-[0_0_0_3px_rgba(197,160,89,0.18)]"
  );

  if (status === "success") {
    return (
      <div
        className="border border-deep/15 bg-secondary/40 px-6 py-14 text-center md:px-10"
        role="status"
        aria-live="polite"
      >
        <p className="label-caps mb-4 text-accent">Request received</p>
        <p className="font-heading text-3xl text-deep md:text-4xl">Thank you.</p>
        <p className="mx-auto mt-4 max-w-md font-body text-base leading-relaxed text-muted">
          Your enquiry is with us. We&apos;ll respond within one business day —
          or message us on WhatsApp for a quicker reply.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center border border-deep px-6 py-3 font-body text-xs uppercase tracking-[0.16em] text-deep transition-colors hover:border-accent hover:text-accent"
          >
            WhatsApp Us
          </a>
          <button
            type="button"
            className="inline-flex min-h-12 items-center justify-center px-6 py-3 font-body text-xs uppercase tracking-[0.16em] text-muted transition-colors hover:text-deep"
            onClick={() => setStatus("idle")}
          >
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-[3px] border border-deep/10 bg-background/90 p-4 shadow-[0_20px_60px_rgba(18,38,31,0.08)] sm:p-6 md:p-8"
      aria-label="Consultation request"
    >
      <div className="mb-8 border-b border-deep/10 pb-6">
        <p className="label-caps mb-2">Enquiry</p>
        <p className="font-heading text-2xl text-deep md:text-3xl">
          Tell us about your space.
        </p>
        <p className="mt-2 font-body text-sm leading-relaxed text-muted">
          Required fields are marked. We visit with sample catalogues when
          helpful.
        </p>
      </div>

      <div className="space-y-6">
        {field(
          "name",
          "Name *",
          <input
            id={`${formId}-name`}
            name="name"
            autoComplete="name"
            placeholder="Your full name"
            className={inputClass}
            value={values.name}
            aria-invalid={!!(touched.name && errors.name)}
            aria-describedby={
              touched.name && errors.name ? `${formId}-name-error` : undefined
            }
            onBlur={() => setTouched((t) => ({ ...t, name: true }))}
            onChange={(e) => setField("name", e.target.value)}
          />
        )}

        <div className="grid gap-6 md:grid-cols-2">
          {field(
            "phone",
            "Phone *",
            <input
              id={`${formId}-phone`}
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="10-digit mobile number"
              className={inputClass}
              value={values.phone}
              aria-invalid={!!(touched.phone && errors.phone)}
              aria-describedby={
                touched.phone && errors.phone
                  ? `${formId}-phone-error`
                  : undefined
              }
              onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
              onChange={(e) => setField("phone", e.target.value)}
            />
          )}
          {field(
            "email",
            "Email *",
            <input
              id={`${formId}-email`}
              name="email"
              type="email"
              autoComplete="email"
              placeholder="name@example.com"
              className={inputClass}
              value={values.email}
              aria-invalid={!!(touched.email && errors.email)}
              aria-describedby={
                touched.email && errors.email
                  ? `${formId}-email-error`
                  : undefined
              }
              onBlur={() => setTouched((t) => ({ ...t, email: true }))}
              onChange={(e) => setField("email", e.target.value)}
            />
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {field(
            "projectType",
            "What do you need? *",
            <select
              id={`${formId}-projectType`}
              name="projectType"
              className={cn(
                inputClass,
                !values.projectType && "text-muted/70"
              )}
              value={values.projectType}
              aria-invalid={!!(touched.projectType && errors.projectType)}
              aria-describedby={
                touched.projectType && errors.projectType
                  ? `${formId}-projectType-error`
                  : undefined
              }
              onBlur={() => setTouched((t) => ({ ...t, projectType: true }))}
              onChange={(e) => setField("projectType", e.target.value)}
            >
              <option value="">Select service</option>
              {projectTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          )}
          {field(
            "location",
            "Property location *",
            <input
              id={`${formId}-location`}
              name="location"
              placeholder="Area / locality in Hyderabad"
              className={inputClass}
              value={values.location}
              aria-invalid={!!(touched.location && errors.location)}
              aria-describedby={
                touched.location && errors.location
                  ? `${formId}-location-error`
                  : undefined
              }
              onBlur={() => setTouched((t) => ({ ...t, location: true }))}
              onChange={(e) => setField("location", e.target.value)}
            />
          )}
        </div>

        {field(
          "date",
          "Preferred visit / consultation date",
          <input
            id={`${formId}-date`}
            name="date"
            type="date"
            className={inputClass}
            value={values.date}
            min={new Date().toISOString().slice(0, 10)}
            onChange={(e) => setField("date", e.target.value)}
          />,
          "Optional — leave blank if you’re flexible."
        )}

        {field(
          "message",
          "Message",
          <textarea
            id={`${formId}-message`}
            name="message"
            rows={5}
            placeholder="Room sizes, styles you like, or anything we should know…"
            className={cn(inputClass, "resize-y min-h-[8rem]")}
            value={values.message}
            onChange={(e) => setField("message", e.target.value)}
          />,
          "Optional, but helpful for a faster quote."
        )}
      </div>

      {status === "error" && (
        <p role="alert" className="mt-6 font-body text-sm text-red-800">
          Something went wrong. Please try again or call us at{" "}
          <a
            href={`tel:${siteConfig.contact.phoneHref}`}
            className="underline underline-offset-2"
          >
            {siteConfig.contact.phone}
          </a>
          .
        </p>
      )}

      <div className="mt-8 flex flex-col gap-3 border-t border-deep/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "loading"}
          className="mb-[calc(var(--sticky-bar-h)+0.5rem)] min-h-12 w-full bg-deep px-6 py-4 font-body text-xs uppercase tracking-[0.16em] text-white transition-opacity hover:opacity-90 disabled:opacity-60 sm:mb-0 sm:w-auto"
        >
          {status === "loading"
            ? "Sending…"
            : siteConfig.cta.requestConsultation}
        </button>
        <a
          href={getWhatsAppUrl(
            `Hello Falkevin Interior Designers, I need help with ${values.projectType || "my space"} in ${values.location || "Hyderabad"}.`
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-12 items-center justify-center font-body text-xs uppercase tracking-[0.14em] text-muted transition-colors hover:text-accent"
        >
          Or message on WhatsApp →
        </a>
      </div>
    </form>
  );
}
