export type CmsPublicationRecord = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  author: string;
  publishDate: string;
  published: boolean;
  heroImage: string;
  seoTitle: string;
  seoDescription: string;
  updatedAt: string | null;
};
