"use client";
import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-gray-800 pt-36">
      <h1 className="text-4xl font-bold mb-2 text-slate-900">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-10">
        Effective Date: <strong>July 23, 2025</strong> &nbsp;|&nbsp; Last
        Updated: <strong>July 23, 2025</strong>
      </p>

      <section className="mb-8">
        <p>
          Prestige Trading Academy ("we", "our", or "us") respects your privacy
          and is committed to protecting your personal data. This Privacy Policy
          describes how we collect, use, store, and disclose your information
          when you access our website at{" "}
          <a
            href="https://www.prestigetradingacademy.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            www.prestigetradingacademy.uk
          </a>{" "}
          and use our services.
        </p>
      </section>

      <Section title="1. Information We Collect">
        <SubSection title="a. Personal Information">
          <ul className="list-disc pl-6">
            <li>Full name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Country of residence</li>
            <li>Payment details (if applicable)</li>
          </ul>
        </SubSection>
        <SubSection title="b. Non-Personal Information">
          <ul className="list-disc pl-6">
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>Device type and operating system</li>
            <li>Pages visited and time spent on the website</li>
          </ul>
        </SubSection>
      </Section>

      <Section title="2. How We Use Your Information">
        <ul className="list-disc pl-6">
          <li>
            Provide access to our trading systems and educational services
          </li>
          <li>
            Communicate updates, market insights, and educational materials
          </li>
          <li>Enhance website functionality and user experience</li>
          <li>Detect and prevent fraud or unauthorized access</li>
          <li>Comply with legal and regulatory requirements</li>
        </ul>
      </Section>

      <Section title="3. Newsletter & Communication">
        <p>If you subscribe to our newsletter, we may send:</p>
        <ul className="list-disc pl-6 mt-2">
          <li>Market analysis and trading signals</li>
          <li>Educational materials and academy announcements</li>
          <li>Special offers and promotions</li>
        </ul>
        <p className="mt-2">
          You can opt out at any time by clicking the “unsubscribe” link in our
          emails.
        </p>
      </Section>

      <Section title="4. Sharing Your Information">
        <ul className="list-disc pl-6">
          <li>
            We do <strong>not</strong> sell or rent your personal data.
          </li>
          <li>
            We may share data only with:
            <ul className="list-disc pl-6 mt-1">
              <li>
                Trusted third-party service providers (e.g., hosting, analytics,
                communications)
              </li>
              <li>Legal or regulatory authorities when required by law</li>
              <li>With your explicit consent, if applicable</li>
            </ul>
          </li>
        </ul>
      </Section>

      <Section title="5. Data Retention">
        <ul className="list-disc pl-6">
          <li>
            We retain your data while your account is active or as needed for
            our services
          </li>
          <li>
            We may retain data longer when required by tax, legal, or security
            obligations
          </li>
        </ul>
      </Section>

      <Section title="6. Your Rights">
        <p>You have the right to:</p>
        <ul className="list-disc pl-6 mt-2">
          <li>Access, correct, or delete your personal data</li>
          <li>
            Restrict or object to data processing in certain circumstances
          </li>
          <li>
            Withdraw consent at any time (without affecting prior lawful
            processing)
          </li>
          <li>File a complaint with your national data protection authority</li>
        </ul>
        <p className="mt-2">
          To exercise your rights, please contact us at{" "}
          <a
            href="mailto:support@prestigetradingacademy.uk"
            className="text-blue-600 underline"
          >
            support@prestigetradingacademy.uk
          </a>
        </p>
      </Section>

      <Section title="7. Cookies">
        <p>
          We use cookies to improve your experience, analyze site usage, and
          optimize performance. You can disable cookies through your browser
          settings, though this may affect site functionality.
        </p>
      </Section>

      <Section title="8. Third-Party Links">
        <p>
          Our site may contain links to third-party websites or services. We are
          not responsible for the privacy practices or content of those external
          sites.
        </p>
      </Section>

      <Section title="9. Security Measures">
        <p>
          We implement security protocols including SSL encryption, firewalls,
          and secure storage practices. However, no system is 100% secure.
          Please take reasonable precautions when sharing data online.
        </p>
      </Section>

      <Section title="10. Policy Updates">
        <p>
          We may update this Privacy Policy to reflect changes in our practices
          or applicable laws. The latest version will always be available on
          this page.
        </p>
      </Section>

      <Section title="11. Contact Us">
        <p>
          If you have any questions or concerns about this policy, please
          contact us at:
        </p>
        <p className="mt-2">
          📧{" "}
          <a
            href="mailto:support@prestigetradingacademy.uk"
            className="text-blue-600 underline"
          >
            support@prestigetradingacademy.uk
          </a>
        </p>
      </Section>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <h2 className="text-2xl font-semibold text-slate-900 mb-3">{title}</h2>
      <div className="text-gray-700 leading-relaxed">{children}</div>
    </section>
  );
}

function SubSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4">
      <h3 className="text-lg font-medium text-slate-800 mb-1">{title}</h3>
      <div className="text-gray-700">{children}</div>
    </div>
  );
}
