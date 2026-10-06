"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button";
import { Skeleton } from './ui/skeleton';

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleTheme = () => {
    if (resolvedTheme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  if (!isMounted) {
    return <Skeleton className="h-8 w-24 rounded-full" />;
  }

  return (
    <Button variant="outline" size="sm" onClick={toggleTheme} className="relative h-8 w-24 justify-start rounded-full px-2">
      <span className="sr-only">Toggle theme</span>
      
      {/* Light Mode */}
      <div className={cn(
        "absolute left-1.5 flex items-center gap-2 transition-opacity duration-300",
        resolvedTheme === 'dark' ? 'opacity-0' : 'opacity-100'
      )}>
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Sun className="h-4 w-4" />
        </div>
        <span className="text-xs font-medium text-muted-foreground">LIGHT</span>
      </div>

      {/* Dark Mode */}
      <div className={cn(
        "absolute right-1 flex items-center gap-1 transition-opacity duration-300",
        resolvedTheme === 'dark' ? 'opacity-100' : 'opacity-0'
      )}>
        <span className="text-xs font-medium text-muted-foreground">DARK</span>
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Moon className="h-4 w-4" />
        </div>
      </div>
    </Button>
  );
}
