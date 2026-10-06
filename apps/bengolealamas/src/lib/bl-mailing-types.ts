export type MailingContact = {
  email: string;
  name: string;
};

export type MailingListSummary = {
  id: string;
  name: string;
  description: string;
  contactCount: number;
  updatedAt: string | null;
};

export type MailingListRecord = MailingListSummary & {
  contacts: MailingContact[];
  createdAt: string | null;
  createdByEmail: string | null;
};

export type MailingSendRecord = {
  id: string;
  publicationId: string;
  publicationTitle: string;
  publicationSlug: string;
  listIds: string[];
  listNames: string[];
  recipientCount: number;
  sentCount: number;
  failedCount: number;
  fromEmail: string;
  sentAt: string | null;
  sentByEmail: string | null;
  errorSummary: string;
};

export type MailingConfig = {
  fromName: string;
  fromAddress: string;
  replyTo: string;
  resendConfigured: boolean;
};
