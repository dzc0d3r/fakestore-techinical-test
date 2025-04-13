import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - WeasyDoo Store",
  description: "Learn how we handle your personal data at WeasyDoo Store",
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Privacy Policy</h1>

      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">
          1. Information We Collect
        </h2>
        <p className="mb-4">
          When you shop at WeasyDoo Store, we collect personal information you
          provide such as your name, shipping address, email address, and
          payment information. We also automatically collect certain information
          about your device and browsing actions.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">
          2. How We Use Your Information
        </h2>
        <p className="mb-4">
          We use the information we collect to process your orders, communicate
          with you, screen for potential risk or fraud, and provide you with
          information or advertising relating to our products.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">3. Data Security</h2>
        <p className="mb-4">
          We implement security measures to maintain the safety of your personal
          information. Your payment information is encrypted using secure socket
          layer technology (SSL).
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">4. Third-Party Services</h2>
        <p className="mb-4">
          We use third-party services like FakeStoreAPI to process payments and
          fulfill orders. These providers have their own privacy policies
          regarding the information we must share with them.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold">
          5. Changes to This Policy
        </h2>
        <p className="mb-4">
          We may update this privacy policy from time to time to reflect changes
          to our practices or for other operational, legal, or regulatory
          reasons.
        </p>
      </section>

      <p className="text-sm text-gray-500">
        Last updated: {new Date().toLocaleDateString()}
      </p>
    </div>
  );
}
