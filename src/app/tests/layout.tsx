import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Diagnostic Tests & Health Packages | Dr. Baviskar Pathology Lab',
  description: 'Explore our wide range of diagnostic tests including CBC, Thyroid Profile, Liver Function Test, and more. Quality diagnostics in Pune.',
};

export default function TestsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
