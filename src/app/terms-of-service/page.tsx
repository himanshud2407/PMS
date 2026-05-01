import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Terms of Service - Dr. Baviskar Pathology Lab',
  description: 'Terms of Service of Dr. Baviskar Pathology Lab.',
};

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-1 max-w-4xl mx-auto w-full px-6 py-16 md:py-24 mt-20 md:mt-32 bg-white shadow-sm rounded-3xl my-12 border border-gray-100">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-8">Terms of Service</h1>
        <div className="prose prose-blue max-w-none text-gray-600">
          <p className="text-lg mb-6 text-gray-500">Last updated: May 2026</p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing and using the services provided by Dr. Baviskar Pathology Lab, you accept and agree to be bound by the terms and provision of this agreement. 
              In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Description of Service</h2>
            <p className="mb-4">
              Dr. Baviskar Pathology Lab provides diagnostic testing and health-related information services. The information provided through our platform and tests is for informational purposes and should not be considered a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. User Responsibilities</h2>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>You agree to provide accurate and complete personal and medical information as required for testing.</li>
              <li>You must follow all pre-test instructions provided by our lab staff or on our website.</li>
              <li>You are responsible for maintaining the confidentiality of any account credentials and test results accessed online.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Test Results and Reports</h2>
            <p className="mb-4">
              While we strive to provide accurate and timely results, turnaround times may vary depending on the nature of the test. 
              Results will be delivered to the patient and, where authorized, their healthcare provider. 
              We reserve the right to withhold results until payment in full has been received.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Payment and Cancellation</h2>
            <p className="mb-4">
              Payment for services must be made in full before or at the time of sample collection, unless alternative arrangements have been formally agreed upon. 
              Cancellations may be subject to a fee if made within 24 hours of a scheduled appointment. 
              No refunds will be provided for tests that have already been processed.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Changes to Terms</h2>
            <p className="mb-4">
              We reserve the right to modify these terms from time to time at our sole discretion. Therefore, you should review these pages periodically. Your continued use of the Website or our service after any such change constitutes your acceptance of the new Terms.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
