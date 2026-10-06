'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { solutionIcons } from '@/lib/constants';

interface SolutionCardProps {
  slug: string;
  title: string;
  icon: string;
  shortDescription: string;
}

export function SolutionCard({
  slug,
  title,
  icon,
  shortDescription,
}: SolutionCardProps) {

  const Icon = solutionIcons[icon];

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-4">
          {Icon && <Icon className="h-10 w-10 text-primary" />}
          <CardTitle className="text-2xl font-headline">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="min-h-[100px] text-base">
          {shortDescription}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline">
          <Link href={`/solutions/${slug}`}>
            Learn More <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
