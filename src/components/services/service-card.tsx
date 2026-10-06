import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { serviceIcons } from '@/lib/constants';

interface ServiceCardProps {
  title: string;
  icon: string;
  content: {
    heading: string;
    paragraphs: string[];
  }[];
}

export function ServiceCard({
  title,
  icon,
  content,
}: ServiceCardProps) {
  const Icon = serviceIcons[icon];

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-4">
          {Icon && <Icon className="h-10 w-10 text-primary" />}
          <CardTitle className="text-2xl font-headline">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 text-muted-foreground">
        {content.map((section, index) => (
            <div key={index}>
                {section.heading && <h3 className="font-semibold text-lg text-foreground mt-4 mb-2">{section.heading}</h3>}
                {section.paragraphs.map((p, i) => <p key={i} className="mb-4 last:mb-0">{p}</p>)}
            </div>
        ))}
      </CardContent>
    </Card>
  );
}
