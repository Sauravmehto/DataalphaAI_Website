type ContactLogPayload = {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
  website?: string;
  turnstileToken?: string;
};

export function redactContactPayload(data: ContactLogPayload) {
  if (process.env.NODE_ENV === 'development') {
    return {
      ...data,
      turnstileToken: data.turnstileToken ? '[present]' : '[missing]',
    };
  }

  return {
    name: data.name,
    company: data.company,
    emailDomain: data.email?.split('@')[1] ?? 'unknown',
    messageLength: data.message?.length ?? 0,
    hasHoneypot: Boolean(data.website?.trim()),
    hasToken: Boolean(data.turnstileToken),
  };
}

export function logContactSubmission(stage: string, payload: unknown) {
  console.log(`[contact:${stage}]`, JSON.stringify(payload, null, 2));
}
