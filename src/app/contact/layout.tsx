import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Dr. Baviskar Pathology Lab',
  description: 'Get in touch with Dr. Baviskar Pathology Lab for any queries or to book a home sample collection in Pune.',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
