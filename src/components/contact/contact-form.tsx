'use client';

import { useEffect, useState, useTransition } from 'react';
import Script from 'next/script';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';

import { sendEmail } from '@/app/actions/send-email';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  contactFormSchema,
  type ContactFormValues,
} from '@/lib/validations/contact';

declare global {
  interface Window {
    onTurnstileSuccess?: (token: string) => void;
  }
}

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [turnstileKey, setTurnstileKey] = useState(0);
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      message: '',
      website: '',
      turnstileToken: '',
    },
  });

  useEffect(() => {
    window.onTurnstileSuccess = (token: string) => {
      form.setValue('turnstileToken', token, { shouldValidate: true });
    };

    return () => {
      delete window.onTurnstileSuccess;
    };
  }, [form]);

  function onSubmit(values: ContactFormValues) {
    startTransition(async () => {
      const result = await sendEmail(values);

      if (result.success) {
        toast({
          title: 'Message Sent',
          description: 'Thank you for reaching out. We will get back to you soon.',
        });
        form.reset();
        setTurnstileKey((current) => current + 1);
        return;
      }

      toast({
        variant: 'destructive',
        title: 'Unable to send message',
        description: result.error,
      });
    });
  }

  return (
    <>
      {turnstileSiteKey ? (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="lazyOnload"
        />
      ) : null}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    autoFocus
                    placeholder="John Doe"
                    className="placeholder:text-gray-400"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="john.doe@company.com"
                    className="placeholder:text-gray-400"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your Company Inc."
                    className="placeholder:text-gray-400"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about how we can help"
                    className="min-h-[120px] placeholder:text-gray-400"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute -left-[9999px] h-0 w-0 opacity-0"
            {...form.register('website')}
          />

          {turnstileSiteKey ? (
            <div key={turnstileKey}>
              <div
                className="cf-turnstile"
                data-sitekey={turnstileSiteKey}
                data-callback="onTurnstileSuccess"
              />
              {form.formState.errors.turnstileToken ? (
                <p className="mt-2 text-sm font-medium text-destructive">
                  {form.formState.errors.turnstileToken.message}
                </p>
              ) : null}
            </div>
          ) : (
            <p className="text-sm text-destructive">
              Security verification is not configured. Please contact the site
              administrator.
            </p>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={isPending || !turnstileSiteKey}
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Send Message
          </Button>
        </form>
      </Form>
    </>
  );
}
