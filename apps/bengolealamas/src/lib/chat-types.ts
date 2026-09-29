export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  quickReplies?: string[];
  isFinished?: boolean;
  leadCaptured?: boolean;
  submissionFailed?: boolean;
};
