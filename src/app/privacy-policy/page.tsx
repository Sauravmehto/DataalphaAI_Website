
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="container py-24 sm:py-32">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl font-headline mb-8">
          Privacy Policy &amp; Terms of Use
        </h1>
        <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground">
          
          <h2 className="text-2xl font-headline text-foreground mt-12">1. Acceptance of Terms</h2>
          <p>These Terms constitute a legally binding agreement between you ('User', 'you', or 'your') and DataAlpha AI Private Limited ('we', 'us', 'our', or 'DataAlpha').</p>
          <p>These Terms govern your use of our website – https://www.dataalpha.ai – including any subdomains, applications, or digital interfaces through which we provide information or services (collectively, the 'Website'), as well as access to the products, platforms, tools, and solutions offered by DataAlpha (the 'Services').</p>
          <p>By using the Website, you are deemed to have read, understood, and accepted these Terms.</p>
          <p>Headings are for reference only and do not affect interpretation.</p>

          <h2 className="text-2xl font-headline text-foreground mt-12">2. The Website and the Services</h2>
          <p>The Website provides information about DataAlpha’s AI-driven analytics, data-engineering, and financial-technology solutions ('Services').</p>
          <p>The scope, features, and commercial terms for specific Services may be agreed separately through a written contract or subscription agreement.</p>
          <p>Unless explicitly stated otherwise, the Website and Services are intended for use by registered business entities and professional users.</p>
          <p>We reserve the right to modify, suspend, or remove any Service or feature at any time without prior notice.</p>

          <h2 className="text-2xl font-headline text-foreground mt-12">3. Accounts</h2>
          <p>Certain features may require you to register for a password-protected account ('Account').</p>
          <p>Account registration is conditional on providing accurate and complete information and agreeing to additional terms specific to that Service.</p>
          <p>You are responsible for maintaining the confidentiality of your credentials and must promptly notify us of any unauthorized access.</p>

          <h2 className="text-2xl font-headline text-foreground mt-12">4. Restrictions on Use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use the Website or Services in violation of any law or regulation.</li>
            <li>Bypass or tamper with security features of the Website.</li>
            <li>Impersonate any person or misrepresent your affiliation.</li>
            <li>Use automated means (bots or scrapers) without permission.</li>
            <li>Upload malicious software or files.</li>
            <li>Copy, reproduce, or commercially exploit Website materials without consent.</li>
          </ul>

          <h2 className="text-2xl font-headline text-foreground mt-12">5. Intellectual Property</h2>
          <p>All Website content (text, graphics, logos, code, and design) is the intellectual property of DataAlpha or its licensors.</p>
          <p>The 'DataAlpha' name and logo are registered trademarks. Other marks belong to their respective owners.</p>
          <p>Except as explicitly permitted, you may not copy, distribute, display, or modify Website content.</p>

          <h2 className="text-2xl font-headline text-foreground mt-12">6. Third-Party Links and Content</h2>
          <p>The Website may contain links to third-party websites or content. Such links are provided for your convenience only.</p>
          <p>We do not endorse or control third-party sites or content. Use them at your own risk and under their respective terms.</p>

          <h2 className="text-2xl font-headline text-foreground mt-12">7. Privacy Policy</h2>
          <p>Your use of the Website is governed by our Privacy Policy, available at <Link href="/privacy-policy">https://www.dataalpha.ai/privacy-policy</Link>.</p>

          <h2 className="text-2xl font-headline text-foreground mt-12">8. Disclaimers and Limitation of Liability</h2>
          <p>The Website and Services are provided 'as is' and 'as available', without warranties of any kind.</p>
          <p>DataAlpha disclaims all liability for any indirect, incidental, or consequential damages from your use of the Website or Services.</p>
          <p>DataAlpha does not provide investment, legal, financial, or professional advice through the Website or its content.</p>

          <h2 className="text-2xl font-headline text-foreground mt-12">9. Indemnification</h2>
          <p>You agree to indemnify and hold harmless DataAlpha, its officers, employees, and affiliates from any claims, damages, or expenses arising from your use of the Website or breach of these Terms.</p>

          <h2 className="text-2xl font-headline text-foreground mt-12">10. Governing Law and Dispute Resolution</h2>
          <p>These Terms are governed by the laws of India.</p>
          <p>Any dispute shall be subject to the exclusive jurisdiction of the courts in Noida, Uttar Pradesh, India.</p>

          <h2 className="text-2xl font-headline text-foreground mt-12">11. Miscellaneous</h2>
          <p><strong>Entire Agreement:</strong> These Terms and our Privacy Policy constitute the entire agreement between you and DataAlpha.</p>
          <p><strong>Severability:</strong> If any provision is found invalid, the rest remain in effect.</p>
          <p><strong>Waiver:</strong> Failure to enforce any right is not a waiver.</p>
          <p><strong>Electronic Communications:</strong> You consent to receive communications electronically, satisfying legal notice requirements.</p>

          <h2 className="text-2xl font-headline text-foreground mt-12">12. Changes to the Terms</h2>
          <p>We may modify these Terms at any time without notice. The updated date above indicates the latest version.</p>
          <p>By continuing to use the Website, you agree to the revised Terms.</p>

          <h2 className="text-2xl font-headline text-foreground mt-12">13. Contact Us</h2>
          <p>If you have any questions about these Terms, contact us at:</p>
          <address className="not-italic">
            <strong>DataAlpha AI Private Limited</strong><br />
            Email: <a href="mailto:legal@dataalpha.ai">legal@dataalpha.ai</a><br />
            Website: <a href="https://www.dataalpha.ai">https://www.dataalpha.ai</a>
          </address>
        </div>
        <div className="mt-16 text-center">
            <Button asChild size="lg">
                <Link href="/contact">
                    Contact Us <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
            </Button>
        </div>
      </div>
    </div>
  );
}
