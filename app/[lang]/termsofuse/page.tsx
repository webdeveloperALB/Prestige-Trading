"use client";
import React from "react";

export default function TermsOfUse() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-gray-800 pt-36">
      <h1 className="text-4xl font-bold mb-2 text-slate-900">Terms of Use</h1>
      <p className="text-sm text-gray-500 mb-10">
        Effective Date: <strong>July 23, 2025</strong>
      </p>

      <Section title="1. Acceptance of Terms">
        <p>
          By accessing or using the Prestige Trading Academy website (
          <a
            href="https://www.prestigetradingacademy.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            www.prestigetradingacademy.uk
          </a>
          ), you agree to comply with and be bound by these Terms of Use. If you do not agree with these terms, please do not use our website or services.
        </p>
      </Section>

      <Section title="2. Services Provided">
        <p>
          Prestige Trading Academy offers educational materials, AI trading tools, and market-related content. These services are provided for informational and training purposes only and do not constitute financial advice.
        </p>
      </Section>

      <Section title="3. Eligibility">
        <p>
          You must be at least 18 years old and have the legal capacity to enter into binding agreements to use our services. By using the website, you confirm that you meet these requirements.
        </p>
      </Section>

      <Section title="4. Account Registration">
        <ul className="list-disc pl-6">
          <li>You agree to provide accurate and complete information during registration.</li>
          <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
          <li>We reserve the right to suspend or terminate accounts for violations of these terms.</li>
        </ul>
      </Section>

      <Section title="5. User Conduct">
        <p>You agree not to:</p>
        <ul className="list-disc pl-6 mt-2">
          <li>Engage in any activity that violates applicable laws or regulations</li>
          <li>Attempt to gain unauthorized access to our systems or data</li>
          <li>Use our services for fraudulent, malicious, or deceptive purposes</li>
          <li>Upload or transmit harmful software, content, or data</li>
        </ul>
      </Section>

      <Section title="6. Intellectual Property">
        <p>
          All content, trademarks, logos, and intellectual property on this website are owned by or licensed to Prestige Trading Academy. You may not reproduce, distribute, or use any content without prior written consent.
        </p>
      </Section>

      <Section title="7. Payment & Subscriptions">
        <ul className="list-disc pl-6">
          <li>Some services may require payment or a subscription.</li>
          <li>All payments are processed securely via trusted third-party providers.</li>
          <li>By subscribing, you agree to recurring billing terms (if applicable).</li>
        </ul>
      </Section>

      <Section title="8. Disclaimer of Warranties">
        <p>
          Our services are provided on an “as-is” and “as-available” basis. Prestige Trading Academy makes no warranties, express or implied, regarding the accuracy, reliability, or availability of its content or tools.
        </p>
      </Section>

      <Section title="9. Limitation of Liability">
        <p>
          To the fullest extent permitted by law, Prestige Trading Academy shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of the website or services.
        </p>
      </Section>

      <Section title="10. Termination">
        <p>
          We may suspend or terminate your access to the website or services at any time, with or without notice, for conduct that violates these Terms or is otherwise harmful to our business or users.
        </p>
      </Section>

      <Section title="11. Changes to These Terms">
        <p>
          We may update these Terms of Use at any time. Continued use of the website constitutes acceptance of the updated terms. The most recent version will always be available on this page.
        </p>
      </Section>

      <Section title="12. Governing Law">
        <p>
          These Terms are governed by and construed in accordance with the laws of the United Kingdom, without regard to its conflict of law principles.
        </p>
      </Section>

      <Section title="13. Contact Us">
        <p>
          For questions or concerns regarding these Terms, please contact us at:
        </p>
        <p className="mt-2">
          📧{" "}
          <a href="mailto:support@prestigetradingacademy.uk" className="text-blue-600 underline">
            support@prestigetradingacademy.uk
          </a>
        </p>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-2xl font-semibold text-slate-900 mb-3">{title}</h2>
      <div className="text-gray-700 leading-relaxed">{children}</div>
    </section>
  );
}
