import { Mail, MapPin, Linkedin } from 'lucide-react';
import { ContactForm } from '@/components/contact/contact-form';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';


export default function ContactPage() {
  const offices = [
    {
      name: "US Office",
      address: "221 River Street, 9th Floor, Hoboken, NJ, 07030, USA",
    },
    {
      name: "India Office",
      address: "F1 Skymark, Sector-6, Noida, Uttar Pradesh, India"
    }
  ];

  return (
    <div className="py-24 sm:py-32">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">
            Get in Touch
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            We'd love to hear from you. Whether you have a question about our solutions, pricing, or anything else, our team is ready to answer all your questions.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
             <h2 className="text-2xl font-bold font-headline">Contact Information</h2>
             <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Mail className="h-6 w-6 text-primary" />
                    <div>
                        <h3 className="font-semibold">Email</h3>
                        <a href="mailto:sales@dataalpha.ai" className="text-muted-foreground hover:text-primary">sales@dataalpha.ai</a>

                    </div>
                </div>
                 {offices.map((office) => (
                  <div key={office.name} className="flex items-start gap-4">
                      <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                      <div>
                          <h3 className="font-semibold">{office.name}</h3>
                          <p className="text-muted-foreground">{office.address}</p>
                      </div>
                  </div>
                ))}
             </div>
             <div className="flex gap-4 pt-4">
                
                <Button asChild variant="outline" size="icon">
                    <Link href="https://www.linkedin.com/company/dataalpha-ai" aria-label="LinkedIn">
                        <Linkedin className="h-5 w-5" />
                    </Link>
                </Button>
             </div>
          </div>

          <div className="p-8 border rounded-lg bg-card">
            <h2 className="text-2xl font-bold font-headline mb-6">Send us a Message</h2>
            <ContactForm />
          </div>
        </div>
        
        <div className="mt-24">
            <h2 className="text-3xl font-bold text-center mb-8 font-headline">Our Location</h2>
             <div className="w-full overflow-hidden rounded-lg shadow-lg">
                <Image
                  src="/dataalpha-locations.png"
                  alt="DataAlpha Locations"
                  width={1200}
                  height={800}
                  data-ai-hint="world map"
                  className="w-full h-auto"
                />
             </div>
        </div>
      </div>
    </div>
  );
}
