import { Metadata } from 'next';
import { BLOG_POSTS } from '../../../constants';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = BLOG_POSTS.find(p => p.title.toLowerCase().replace(/ /g, '-') === params.slug);

  if (!post) {
    return {
      title: 'Post Not Found | Dr. Baviskar Pathology Lab',
      description: 'The requested blog post could not be found.',
    };
  }

  return {
    title: `${post.title} | Dr. Baviskar Pathology Lab`,
    description: post.description || `Read about ${post.title} on Dr. Baviskar Pathology Lab's blog.`,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  };
}

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
