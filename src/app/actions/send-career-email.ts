
'use server';

import * as z from 'zod';
import { render } from '@react-email/render';
import { Resend } from 'resend';
import { CareerApplicationEmail } from '@/components/emails/career-application-email';

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB
const ACCEPTED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  jobTitle: z.string(),
  resume: z
    .any()
    .refine((file) => file, 'Resume is required.')
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      `Resume must be less than 4MB.`
    )
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file.type),
      'Only .pdf, .doc, and .docx formats are supported.'
    ),
  message: z.string().optional(),
});


export async function sendCareerEmail(formData: FormData) {
  if (!resend) {
    console.error('Resend is not configured. Missing RESEND_API_KEY.');
    return {
      error:
        'The email service is not configured. Please contact the site administrator.',
    };
  }

  const values = {
      name: formData.get('name'),
      email: formData.get('email'),
      jobTitle: formData.get('jobTitle'),
      message: formData.get('message'),
      resume: formData.get('resume'),
  }

  const result = formSchema.safeParse(values);

  if (!result.success) {
    const errorMessages = result.error.errors.map(e => e.message).join(', ');
    return { error: `Invalid data provided: ${errorMessages}` };
  }

  const { name, email, jobTitle, resume, message } = result.data;
  
  const resumeBuffer = Buffer.from(await resume.arrayBuffer());

  try {
    const html = await render(
      CareerApplicationEmail({ name, email, jobTitle, message })
    );

    const emailData = await resend.emails.send({
      from: 'DataAlpha Careers <onboarding@resend.dev>',
      to: ['careers@dataalpha.ai'],
      subject: `New Application for ${jobTitle} from ${name}`,
      replyTo: email,
      html,
      attachments: [
        {
          filename: resume.name,
          content: resumeBuffer,
        },
      ],
    });

    if (emailData.error) {
      return { error: 'Failed to send application.' };
    }

    return { data: emailData };
  } catch (error) {
    console.error('Email sending error:', error);
    return { error: 'Failed to send application.' };
  }
}
