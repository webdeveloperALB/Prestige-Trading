"use client";
import React from "react";

export default function Security() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-gray-800 pt-36">
      <h1 className="text-4xl font-bold mb-2 text-slate-900">Security</h1>
      <p className="text-sm text-gray-500 mb-10">
        Effective Date: <strong>July 23, 2025</strong>
      </p>

      <Section title="1. Our Commitment to Security">
        <p>
          At Prestige Trading Academy, safeguarding your personal information
          and financial data is our top priority. We implement industry-standard
          security practices to protect your data from unauthorized access,
          misuse, or loss.
        </p>
      </Section>

      <Section title="2. Data Encryption">
        <ul className="list-disc pl-6">
          <li>
            All data transmissions between your browser and our servers are
            protected using <strong>SSL (Secure Socket Layer)</strong>{" "}
            encryption.
          </li>
          <li>
            Sensitive data, including login credentials and payment details, are
            securely encrypted in transit and at rest.
          </li>
        </ul>
      </Section>

      <Section title="3. Secure Authentication">
        <ul className="list-disc pl-6">
          <li>
            We use modern authentication protocols.
          </li>
          <li>
            Passwords are hashed and stored using strong cryptographic
            algorithms.
          </li>
          <li>
            Session handling includes token expiration, idle timeouts, and
            refresh mechanisms.
          </li>
        </ul>
      </Section>

      <Section title="4. Account Protection Recommendations">
        <p>To help protect your account, we recommend:</p>
        <ul className="list-disc pl-6 mt-2">
          <li>Using a strong and unique password</li>
          <li>Logging out from shared or public devices</li>
          <li>Enabling email verification and alerts</li>
          <li>Monitoring your account for suspicious activity</li>
        </ul>
      </Section>

      <Section title="5. Infrastructure & Hosting">
        <p>
          Our services are hosted on secure, cloud-based infrastructure with
          strict access controls, including:
        </p>
        <ul className="list-disc pl-6 mt-2">
          <li>Geographically redundant data centers</li>
          <li>Real-time monitoring and logging of critical systems</li>
          <li>Firewalls and DDoS mitigation at the network level</li>
        </ul>
      </Section>

      <Section title="6. Access Control & Internal Policies">
        <ul className="list-disc pl-6">
          <li>
            Only authorized personnel have access to sensitive systems and data
          </li>
          <li>
            Role-based permissions and access logging are enforced internally
          </li>
          <li>
            Regular reviews of permissions and least-privilege enforcement
          </li>
        </ul>
      </Section>

      <Section title="7. Responsible Disclosure">
        <p>
          If you believe you've discovered a security vulnerability, we
          encourage responsible disclosure. Please contact us immediately at{" "}
          <a
            href="mailto:security@prestigetradingacademy.uk"
            className="text-blue-600 underline"
          >
            security@prestigetradingacademy.uk
          </a>
          . We investigate all reports promptly and take appropriate action.
        </p>
      </Section>

      <Section title="8. Limitations">
        <p>
          While we strive to maintain high security standards, no system is
          completely immune to threats. Users are responsible for their own
          device security, internet connection, and access environment.
        </p>
      </Section>

      <Section title="9. Updates to This Security Policy">
        <p>
          This page may be updated periodically to reflect changes in our
          security practices. All updates will be published here with a revised
          effective date.
        </p>
      </Section>

      <Section title="10. Contact Us">
        <p>For any questions or concerns regarding security, please contact:</p>
        <p className="mt-2">
          📧{" "}
          <a
            href="mailto:security@prestigetradingacademy.uk"
            className="text-blue-600 underline"
          >
            security@prestigetradingacademy.uk
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
