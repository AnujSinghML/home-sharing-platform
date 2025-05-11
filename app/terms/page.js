import React from 'react';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
      
      <div className="prose prose-lg">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p className="text-gray-700">
            By accessing and using HomeShare, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
          <p className="text-gray-700">
            Permission is granted to temporarily use HomeShare for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul className="list-disc pl-6 mt-4 text-gray-700">
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose</li>
            <li>Attempt to decompile or reverse engineer any software contained on HomeShare</li>
            <li>Remove any copyright or other proprietary notations from the materials</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. User Responsibilities</h2>
          <p className="text-gray-700">
            As a user of HomeShare, you agree to:
          </p>
          <ul className="list-disc pl-6 mt-4 text-gray-700">
            <li>Provide accurate and complete information</li>
            <li>Maintain the security of your account</li>
            <li>Not engage in any fraudulent or illegal activities</li>
            <li>Respect the privacy and rights of other users</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Disclaimer</h2>
          <p className="text-gray-700">
            The materials on HomeShare are provided on an 'as is' basis. HomeShare makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Limitations</h2>
          <p className="text-gray-700">
            In no event shall HomeShare or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on HomeShare.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Revisions and Errata</h2>
          <p className="text-gray-700">
            The materials appearing on HomeShare could include technical, typographical, or photographic errors. HomeShare does not warrant that any of the materials on its website are accurate, complete, or current. HomeShare may make changes to the materials contained on its website at any time without notice.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Contact Information</h2>
          <p className="text-gray-700">
            If you have any questions about these Terms of Service, please contact us at support@homeshare.com.
          </p>
        </section>
      </div>
    </div>
  );
} 