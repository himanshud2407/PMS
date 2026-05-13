import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Dr Baviskar Pathology lab',
  description: 'Learn about our mission, vision, and the advanced diagnostic technology we use at Dr Baviskar Pathology lab.',
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
