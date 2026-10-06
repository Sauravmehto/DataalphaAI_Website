
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center px-4 py-16">
      <div className="max-w-md">
        <h1 className="text-8xl md:text-9xl font-bold text-primary font-headline tracking-tighter">
          404
        </h1>
        <h2 className="mt-4 text-3xl md:text-4xl font-semibold text-foreground font-headline">
          Page Not Found
        </h2>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground">
          Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
        </p>
        <Button asChild className="mt-8" size="lg">
          <Link href="/">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Go back to Homepage
          </Link>
        </Button>
      </div>
    </div>
  );
}
