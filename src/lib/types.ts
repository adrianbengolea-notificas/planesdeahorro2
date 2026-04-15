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

// Estructura del JSON que devuelve el flujo de IA
export interface CaseEvaluation {
  nombre: string;
  whatsapp: string;
  email: string;
  ciudad: string;
  provincia: string;
  administradora: string;
  estadoPlan: string;
  adjudicado: string;
  vehiculoRecibido: string;
  grupoOrden: string;
  problemaPrincipal: string;
  resumenHechos: string;
  documentacionDisponible: string[];
  urgencia: 'alta' | 'media' | 'baja';
  motivoUrgencia: string;
  posibleCategoriaJuridica: string;
  proximaAccionSugerida: string;
}

// Tipo para los mensajes en el chat
export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  quickReplies?: string[];
  isFinished?: boolean;
};
