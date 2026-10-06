"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export function BlogSubscribe() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = email.trim();

    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });

      const data = (await response.json().catch(() => ({}))) as {
        success?: boolean;
        message?: string;
      };

      if (!response.ok || !data.success) {
        toast({
          title: "Subscription failed",
          description:
            data.message || "Something went wrong. Please try again.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Thanks for subscribing",
        description:
          data.message || "You're on the list for DataAlpha updates.",
      });
      setEmail("");
    } catch {
      toast({
        title: "Subscription failed",
        description: "Unable to reach the server. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="rounded-2xl border border-border/60 bg-muted/40 px-6 py-10 sm:px-10 sm:py-12">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        <div className="max-w-xl">
          <h2 className="text-2xl font-bold tracking-tight font-headline sm:text-3xl">
            Get the Latest from DataAlpha
          </h2>
          <p className="mt-3 text-muted-foreground">
            Subscribe for company announcements, product news, and industry
            insights that keep you informed and ahead.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-xl flex-col gap-3 sm:flex-row sm:items-stretch"
        >
          <Input
            type="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email Address"
            required
            disabled={isSubmitting}
            aria-label="Email Address"
            className="h-12 flex-1 bg-background text-base"
          />
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="h-12 shrink-0 px-6 font-semibold"
          >
            {isSubmitting ? "Subscribing..." : "Subscribe Now"}
          </Button>
        </form>
      </div>
    </section>
  );
}
