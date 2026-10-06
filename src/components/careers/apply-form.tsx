
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTransition, useRef } from 'react';

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
import { Loader2, File } from 'lucide-react';

const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB
const ACCEPTED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  message: z.string().optional(),
  resume: z
    .any()
    .refine((files) => files?.length == 1, 'Resume is required.')
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Resume must be less than 4MB.`
    )
    .refine(
      (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
      'Only .pdf, .doc, and .docx formats are supported.'
    ),
});

type ApplyFormProps = {
    jobTitle: string;
    onFormSubmit: () => void;
}

export function ApplyForm({ jobTitle, onFormSubmit }: ApplyFormProps) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
      resume: undefined,
    },
  });

  const fileRef = form.register('resume');
  const selectedResume = form.watch('resume') as FileList | undefined;
  const selectedFileName = selectedResume?.[0]?.name;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(() => {
      try {
        const fileName = values.resume?.[0]?.name || 'your_resume';
        const emailBody = [
          `Hello DataAlpha Careers Team,`,
          ``,
          `I would like to apply for: ${jobTitle}`,
          ``,
          `Name: ${values.name}`,
          `Email: ${values.email}`,
          `Resume File: ${fileName}`,
          ``,
          `Message:`,
          `${values.message || 'N/A'}`,
          ``,
          `Please find my resume attached to this email.`,
        ].join('\n');

        const mailtoUrl = `mailto:careers@dataalpha.ai?subject=${encodeURIComponent(
          `Application - ${jobTitle} - ${values.name}`
        )}&body=${encodeURIComponent(emailBody)}`;

        window.location.href = mailtoUrl;

        toast({
          title: 'Email Draft Opened',
          description:
            'Your email app is opened. Please attach your resume and send the email.',
        });

        form.reset();
        onFormSubmit();
      } catch (e: any) {
        toast({
          variant: 'destructive',
          title: 'Unable to open email app',
          description:
            e?.message ||
            'Please send your application manually to careers@dataalpha.ai.',
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form
        ref={formRef}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
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
                  <Input type="email" placeholder="john.doe@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="resume"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Resume</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input 
                    type="file" 
                    className="pl-10 file:mr-3 file:rounded-md file:border-0 file:bg-primary/10 file:px-2.5 file:py-1 file:text-xs file:font-medium file:text-primary"
                    accept=".pdf,.doc,.docx"
                    {...fileRef}
                  />
                  <File className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </div>
              </FormControl>
              <p className="text-xs text-muted-foreground">
                PDF, DOC, DOCX up to 4MB
                {selectedFileName ? ` - Selected: ${selectedFileName}` : ''}
              </p>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-3 border-t pt-4">
          <p className="text-xs text-muted-foreground">
            By applying, you consent to DataAlpha reviewing your submitted details.
          </p>
          <Button type="submit" className="w-full h-11" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isPending ? 'Submitting...' : 'Submit Application'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
