import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Privacy Policy - Dr. Baviskar Pathology Lab',
  description: 'Privacy Policy of Dr. Baviskar Pathology Lab.',
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-1 max-w-4xl mx-auto w-full px-6 py-16 md:py-24 mt-20 md:mt-32 bg-white shadow-sm rounded-3xl my-12 border border-gray-100">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-8">Privacy Policy</h1>
        <div className="prose prose-blue max-w-none text-gray-600">
          <p className="text-lg mb-6 text-gray-500">Last updated: May 2026</p>
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Introduction</h2>
            <p className="mb-4">
              Welcome to Dr. Baviskar Pathology Lab. We respect your privacy and are committed to protecting your personal data. 
              This privacy policy will inform you as to how we look after your personal data when you visit our website 
              (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. The Data We Collect About You</h2>
            <p className="mb-4">
              Personal data, or personal information, means any information about an individual from which that person can be identified.
              We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier, title, date of birth and gender.</li>
              <li><strong>Contact Data</strong> includes billing address, email address and telephone numbers.</li>
              <li><strong>Health Data</strong> includes any test results, medical history, or information relevant to the services we provide.</li>
              <li><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. How We Use Your Personal Data</h2>
            <p className="mb-4">
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Where we need to perform the contract we are about to enter into or have entered into with you (e.g., to perform pathology tests).</li>
              <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
              <li>Where we need to comply with a legal obligation.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Data Security</h2>
            <p className="mb-4">
              We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this privacy policy or our privacy practices, please contact us at:
              <br /><br />
              <strong>Email:</strong> info@drbaviskar.com
              <br />
              <strong>Phone:</strong> +91-86052 92626
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
