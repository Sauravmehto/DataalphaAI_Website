
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import functionsData from '@/content/functions.json';
import { Building, Briefcase, Server } from 'lucide-react';

const officeIcons = {
  'Front Office': <Briefcase className="h-5 w-5 mr-2" />,
  'Middle Office': <Server className="h-5 w-5 mr-2" />,
  'Back Office': <Building className="h-5 w-5 mr-2" />,
};

export default function FunctionsPage() {
  const frontOfficeFunctions = functionsData.filter(
    (f) => f.office === 'Front Office'
  );
  const middleOfficeFunctions = functionsData.filter(
    (f) => f.office === 'Middle Office'
  );
  const backOfficeFunctions = functionsData.filter(
    (f) => f.office === 'Back Office'
  );

  const functionTabs = [
    {
      name: 'Front Office',
      functions: frontOfficeFunctions,
    },
    {
      name: 'Middle Office',
      functions: middleOfficeFunctions,
    },
    {
      name: 'Back Office',
      functions: backOfficeFunctions,
    },
  ];

  return (
    <div className="container py-24 sm:py-32">
      <div className="max-w-2xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline">
          Investment Management Functions
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Explore the comprehensive functions our platform supports across the
          entire investment lifecycle, from front to back office.
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        <Tabs defaultValue="Front Office" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            {functionTabs.map((tab) => (
              <TabsTrigger key={tab.name} value={tab.name} className="flex items-center">
                {officeIcons[tab.name as keyof typeof officeIcons]}
                {tab.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {functionTabs.map((tab) => (
            <TabsContent key={tab.name} value={tab.name}>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tab.functions.map((func) => (
                  <Card key={func.title} className="flex flex-col transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/10">
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold">{func.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-muted-foreground">{func.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
