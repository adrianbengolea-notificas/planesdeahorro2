export type CmsPublicationRecord = {
  id: string;
  origin?: 'cms' | 'legacy';
  title: string;
  slug: string;
  excerpt: string;
  tags: string[];
  body: string;
  author: string;
  publishDate: string;
  published: boolean;
  heroImage: string;
  seoTitle: string;
  seoDescription: string;
  updatedAt: string | null;
};
