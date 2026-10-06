import * as React from 'react';
import {
  Html,
  Body,
  Head,
  Heading,
  Container,
  Preview,
  Section,
  Text,
} from '@react-email/components';

export type ContactFormEmailProps = {
  name: string;
  email: string;
  company: string;
  message: string;
};

export function ContactFormEmail({
  name,
  email,
  company,
  message,
}: ContactFormEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New contact message from {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>New Contact Form Submission</Heading>
          <Section>
            <Text style={paragraph}>
              A new message was submitted through the DataAlpha contact form.
            </Text>
            <Text style={item}>
              <strong>Name:</strong> {name}
            </Text>
            <Text style={item}>
              <strong>Email:</strong>{' '}
              <a href={`mailto:${email}`}>{email}</a>
            </Text>
            <Text style={item}>
              <strong>Company:</strong> {company}
            </Text>
            <Heading as="h2" style={subHeading}>
              Message
            </Heading>
            <Text style={messageText}>{message}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export default ContactFormEmail;

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  border: '1px solid #f0f0f0',
  borderRadius: '4px',
};

const heading = {
  fontSize: '24px',
  letterSpacing: '-0.5px',
  lineHeight: '1.3',
  fontWeight: '600',
  color: '#484848',
  padding: '0 30px',
};

const subHeading = {
  fontSize: '18px',
  lineHeight: '1.3',
  fontWeight: '600',
  color: '#484848',
  padding: '0 30px',
  marginTop: '24px',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
  color: '#525f7f',
  padding: '0 30px',
};

const item = {
  ...paragraph,
  padding: '0 30px',
  margin: '8px 0',
};

const messageText = {
  ...paragraph,
  padding: '20px 30px',
  backgroundColor: '#f6f9fc',
  borderRadius: '4px',
  border: '1px solid #f0f0f0',
};
