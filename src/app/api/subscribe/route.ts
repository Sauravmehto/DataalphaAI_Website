import { NextResponse } from "next/server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const HUBSPOT_CONTACTS_URL =
  "https://api.hubapi.com/crm/objects/2026-03/contacts";
const HUBSPOT_NOTES_URL = "https://api.hubapi.com/crm/objects/2026-03/notes";
const NEWSLETTER_NOTE = "Signed up via newsletter subscription form.";

function authHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

async function createNewsletterNote(token: string, contactId: string) {
  const response = await fetch(HUBSPOT_NOTES_URL, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify({
      properties: {
        hs_timestamp: new Date().toISOString(),
        hs_note_body: NEWSLETTER_NOTE,
      },
      associations: [
        {
          to: { id: String(contactId) },
          types: [
            {
              associationCategory: "HUBSPOT_DEFINED",
              associationTypeId: 202, // note_to_contact
            },
          ],
        },
      ],
    }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error("HubSpot note request failed") as Error & {
      status?: number;
      data?: unknown;
    };
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data as { id: string };
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request body." },
      { status: 400 }
    );
  }

  const email =
    typeof body === "object" &&
    body !== null &&
    "email" in body &&
    typeof (body as { email: unknown }).email === "string"
      ? (body as { email: string }).email
      : null;

  if (!email || !EMAIL_REGEX.test(email.trim())) {
    return NextResponse.json(
      { success: false, message: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const token = process.env.HUBSPOT_ACCESS_TOKEN;

  if (!token || token === "your_service_key_here") {
    console.error("HUBSPOT_ACCESS_TOKEN is missing or not set");
    return NextResponse.json(
      {
        success: false,
        message:
          "Server is missing HUBSPOT_ACCESS_TOKEN. Add it to your .env file.",
      },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(HUBSPOT_CONTACTS_URL, {
      method: "POST",
      headers: authHeaders(token),
      body: JSON.stringify({
        properties: {
          email: email.trim(),
          lifecyclestage: "subscriber",
        },
      }),
    });

    const data = (await response.json().catch(() => ({}))) as {
      id?: string;
      message?: string;
      errors?: { message?: string }[];
    };

    if (!response.ok) {
      const status = response.status;
      const hubspotData = data;
      const errorMessage =
        hubspotData?.message || hubspotData?.errors?.[0]?.message || "";

      if (status === 401 || status === 403) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Invalid or unauthorized HubSpot Service Key. Check HUBSPOT_ACCESS_TOKEN.",
          },
          { status }
        );
      }

      if (status === 409) {
        return NextResponse.json(
          {
            success: false,
            message: "A contact with this email already exists in HubSpot.",
          },
          { status: 409 }
        );
      }

      if (
        status === 400 &&
        /already exists|duplicate|CONTACT_EXISTS/i.test(
          JSON.stringify(hubspotData || {})
        )
      ) {
        return NextResponse.json(
          {
            success: false,
            message: "A contact with this email already exists in HubSpot.",
          },
          { status: 409 }
        );
      }

      console.error("HubSpot API error:", status, hubspotData);

      return NextResponse.json(
        {
          success: false,
          message:
            errorMessage ||
            `HubSpot API error (${status}). Check the server logs for details.`,
        },
        { status }
      );
    }

    const contactId = data.id;
    let noteId: string | null = null;

    if (contactId) {
      try {
        const note = await createNewsletterNote(token, contactId);
        noteId = note.id;
      } catch (noteError) {
        console.error(
          "HubSpot note error (contact still created):",
          noteError
        );
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: noteId
          ? "Thanks for subscribing! You're on the list."
          : "Thanks for subscribing! You're on the list.",
        contactId,
        noteId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Unexpected subscribe error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Unable to reach HubSpot. Please try again later.",
      },
      { status: 500 }
    );
  }
}
