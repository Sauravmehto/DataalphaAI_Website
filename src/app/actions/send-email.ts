"use server";

import { render } from "@react-email/render";
import { Resend } from "resend";
import { ContactFormEmail } from "../../components/emails/contact-form-email";
import { logContactSubmission, redactContactPayload } from "@/lib/logger";
import {
  contactFormSchema,
  type ContactFormValues,
} from "@/lib/validations/contact";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

function getContactRecipients(): string[] {
  return (process.env.CONTACT_FORM_RECIPIENTS ?? "")
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);
}

export type SendEmailResult =
  | { success: true }
  | { success: false; error: string };

async function verifyTurnstile(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    console.error("Turnstile is not configured. Missing TURNSTILE_SECRET_KEY.");
    return false;
  }

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret,
        response: token,
      }),
    },
  );

  const data = (await response.json()) as { success?: boolean };

  return Boolean(data.success);
}

export async function sendEmail(
  data: ContactFormValues,
): Promise<SendEmailResult> {
  logContactSubmission("received", redactContactPayload(data));

  const result = contactFormSchema.safeParse(data);

  if (!result.success) {
    logContactSubmission(
      "validation-failed",
      result.error.flatten().fieldErrors,
    );
    return { success: false, error: "Invalid data provided." };
  }

  if (result.data.website?.trim()) {
    logContactSubmission("honeypot-blocked", redactContactPayload(result.data));
    return { success: true };
  }

  const turnstileValid = await verifyTurnstile(result.data.turnstileToken);

  if (!turnstileValid) {
    logContactSubmission("turnstile-failed", { hasToken: true });
    return {
      success: false,
      error: "Security verification failed. Please try again.",
    };
  }

  const { name, email, company, message } = result.data;

  logContactSubmission(
    "validated",
    redactContactPayload({ name, email, company, message }),
  );

  if (!resend) {
    console.error(
      "The email service is not configured. Please contact the site administrator.",
    );
    logContactSubmission("send-skipped", { reason: "missing RESEND_API_KEY" });
    return { success: true };
  }

  const recipients = getContactRecipients();

  if (recipients.length === 0) {
    console.error(
      "Contact form recipients are not configured. Missing CONTACT_FORM_RECIPIENTS.",
    );
    logContactSubmission("send-skipped", {
      reason: "missing CONTACT_FORM_RECIPIENTS",
    });
    return { success: true };
  }

  try {
    const html = await render(
      ContactFormEmail({ name, email, company, message }),
    );

    const emailData = await resend.emails.send({
      from: "DataAlpha Contact Form <no-reply@mail.dataalpha.in>",
      to: recipients,
      subject: `New message from ${name} at ${company}`,
      replyTo: email,
      html,
    });

    if (emailData.error) {
      logContactSubmission("send-failed", { message: emailData.error.message });
      return { success: false, error: "Failed to send email." };
    }

    logContactSubmission("sent", { id: emailData.data?.id ?? null });

    return { success: true };
  } catch (error) {
    console.error("Email sending error:", error);
    logContactSubmission("send-failed", {
      message: error instanceof Error ? error.message : "Unknown error",
    });
    return { success: false, error: "Failed to send email." };
  }
}
