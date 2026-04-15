export interface Ruling {
  slug: string;
  title: string;
  summary: string;
  court: string;
  date: string;
  tags: string[];
  content: string;
}

export interface Article {
  slug: string;
  title: string;
  summary: string;
  author: string;
  date: string;
  content: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface FrequentProblem {
  slug: string;
  title: string;
  description: string;
}
