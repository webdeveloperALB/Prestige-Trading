"use client";
import React from "react";

export default function Compliance() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-gray-800 pt-36">
      <h1 className="text-4xl font-bold mb-2 text-slate-900">Compliance</h1>
      <p className="text-sm text-gray-500 mb-10">
        Effective Date: <strong>July 23, 2025</strong>
      </p>

      <Section title="1. Overview">
        <p>
          Prestige Trading Academy is committed to conducting business in
          accordance with all applicable laws and regulations. We maintain high
          standards of ethical conduct, user data protection, and transparency
          in our services.
        </p>
      </Section>

      <Section title="2. Data Protection & GDPR">
        <p>
          We comply with the General Data Protection Regulation (GDPR) and other
          relevant data privacy laws. Our users have the right to access,
          correct, delete, or restrict the processing of their personal data.
        </p>
        <p className="mt-2">
          For more details, refer to our{" "}
          <a href="/privacy-policy" className="text-blue-600 underline">
            Privacy Policy
          </a>
          .
        </p>
      </Section>

      <Section title="3. Anti-Money Laundering (AML)">
        <p>
          We support the global fight against money laundering, terrorism
          financing, and fraud. In accordance with AML regulations:
        </p>
        <ul className="list-disc pl-6 mt-2">
          <li>We may request identity verification and KYC documentation</li>
          <li>We monitor transactions for suspicious activity</li>
          <li>We cooperate with authorities when required by law</li>
        </ul>
      </Section>

      <Section title="4. Know Your Customer (KYC)">
        <p>
          As part of our compliance framework, we may collect identity documents
          and personal information to verify your identity. This helps prevent
          fraud and ensures regulatory compliance.
        </p>
        <p className="mt-2">
          KYC checks may include passport verification, proof of address, or
          other documentation as needed.
        </p>
      </Section>

      <Section title="5. Educational Disclaimer">
        <p>
          Prestige Trading Academy provides educational resources and trading
          tools. We do not offer financial or investment advice. Users are
          responsible for their own trading decisions and outcomes.
        </p>
      </Section>

      <Section title="6. Local Regulations">
        <p>
          You are responsible for ensuring that your use of our services is
          permitted under the laws and regulations of your jurisdiction. We do
          not knowingly permit access where our services are restricted or
          prohibited.
        </p>
      </Section>

      <Section title="7. Responsible Use of Technology">
        <p>
          Our AI tools and systems are intended to enhance learning and
          decision-making. They should be used responsibly, and not as a
          substitute for human judgment or due diligence in trading or financial
          activities.
        </p>
      </Section>

      <Section title="8. Reporting Violations">
        <p>
          If you become aware of a potential violation of laws, unethical
          conduct, or misuse of our platform, we encourage you to report it.
          Please contact us at:
        </p>
        <p className="mt-2">
          📧{" "}
          <a
            href="mailto:compliance@prestigetradingacademy.uk"
            className="text-blue-600 underline"
          >
            compliance@prestigetradingacademy.uk
          </a>
        </p>
      </Section>

      <Section title="9. Updates to This Policy">
        <p>
          This compliance page may be updated to reflect changes in legal
          requirements, operational procedures, or business practices. Please
          check this page periodically for the latest information.
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
