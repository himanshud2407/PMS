import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Dr. Baviskar Pathology Lab',
  description: 'Learn about our mission, vision, and the advanced diagnostic technology we use at Dr. Baviskar Pathology Lab.',
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
