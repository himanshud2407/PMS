import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Health Blog & Medical News | Dr Baviskar Pathology lab',
  description: 'Stay updated with the latest health tips, medical news, and laboratory updates from Dr Baviskar Pathology lab in Pune.',
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
