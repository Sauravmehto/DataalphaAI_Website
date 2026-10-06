
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

interface CareerApplicationEmailProps {
  name: string;
  email: string;
  jobTitle: string;
  message?: string;
}

export const CareerApplicationEmail: React.FC<Readonly<CareerApplicationEmailProps>> = ({
  name,
  email,
  jobTitle,
  message,
}) => (
  <Html>
    <Head />
    <Preview>New Application for {jobTitle}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>New Job Application</Heading>
        <Section>
          <Text style={paragraph}>A new candidate has applied for the <strong>{jobTitle}</strong> position.</Text>
          <Text style={item}><strong>Candidate Name:</strong> {name}</Text>
          <Text style={item}><strong>Candidate Email:</strong> <a href={`mailto:${email}`}>{email}</a></Text>
          
          {message && (
            <>
              <Heading as="h2" style={subHeading}>Message from candidate:</Heading>
              <Text style={messageText}>{message}</Text>
            </>
          )}

          <Text style={{ ...paragraph, marginTop: '24px' }}>The candidate's resume is attached to this email.</Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
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
    marginTop: '24px'
}

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
}

const messageText = {
    ...paragraph,
    padding: '20px 30px',
    backgroundColor: '#f6f9fc',
    borderRadius: '4px',
    border: '1px solid #f0f0f0'
}
