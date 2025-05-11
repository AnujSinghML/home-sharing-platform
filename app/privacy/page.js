import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="prose prose-lg">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
          <p className="text-gray-700">
            We collect information that you provide directly to us, including:
          </p>
          <ul className="list-disc pl-6 mt-4 text-gray-700">
            <li>Name and contact information</li>
            <li>Account credentials</li>
            <li>Payment information</li>
            <li>Property listings and booking information</li>
            <li>Communications with other users</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
          <p className="text-gray-700">
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-6 mt-4 text-gray-700">
            <li>Provide, maintain, and improve our services</li>
            <li>Process transactions and send related information</li>
            <li>Send administrative information and updates</li>
            <li>Respond to your comments and questions</li>
            <li>Monitor and analyze trends and usage</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Information Sharing</h2>
          <p className="text-gray-700">
            We may share your information with:
          </p>
          <ul className="list-disc pl-6 mt-4 text-gray-700">
            <li>Other users (as necessary to facilitate bookings)</li>
            <li>Service providers who perform services on our behalf</li>
            <li>Law enforcement when required by law</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
          <p className="text-gray-700">
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
          <p className="text-gray-700">
            You have the right to:
          </p>
          <ul className="list-disc pl-6 mt-4 text-gray-700">
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Object to processing of your information</li>
            <li>Data portability</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Cookies and Tracking</h2>
          <p className="text-gray-700">
            We use cookies and similar tracking technologies to track activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Changes to This Policy</h2>
          <p className="text-gray-700">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
          <p className="text-gray-700">
            If you have any questions about this Privacy Policy, please contact us at privacy@homeshare.com.
          </p>
        </section>
      </div>
    </div>
  );
} 