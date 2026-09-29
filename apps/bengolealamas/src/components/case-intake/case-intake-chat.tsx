'use client';

import { useEffect, useRef, useState, useTransition } from 'react';
import Link from 'next/link';
import { MessageCircle, RotateCcw, Send } from 'lucide-react';
import { continueCaseIntake } from '@/actions/case-intake';
import { CASE_INTAKE_COPY, CASE_INTAKE_INITIAL_MESSAGE } from '@/config/case-intake';
import type { ChatMessage } from '@/lib/chat-types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

function trackIntakeEvent(name: string) {
  if (typeof window === 'undefined') return;
  const w = window as Window & { gtag?: (...args: unknown[]) => void };
  w.gtag?.('event', name, { send_to: undefined });
}

export function CaseIntakeChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([CASE_INTAKE_INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [started, setStarted] = useState(false);
  const [isPending, startTransition] = useTransition();
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    trackIntakeEvent('case_chat_opened');
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isPending]);

  const last = messages[messages.length - 1];
  const isFinished = Boolean(last?.isFinished && last?.leadCaptured);
  const canRetryEmail = Boolean(last?.submissionFailed);

  const send = (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || isPending || isFinished) return;

    if (!started) {
      setStarted(true);
      trackIntakeEvent('case_chat_started');
    }

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    startTransition(async () => {
      const history = [...messages, userMessage];
      const reply = await continueCaseIntake(history);
      setMessages((prev) => [...prev, reply]);
      if (reply.leadCaptured) trackIntakeEvent('case_chat_completed');
      if (reply.leadCaptured) trackIntakeEvent('case_chat_email_sent');
    });
  };

  const reset = () => {
    setMessages([CASE_INTAKE_INITIAL_MESSAGE]);
    setInput('');
    setStarted(false);
  };

  const retryAfterEmailFailure = () => {
    startTransition(async () => {
      const reply = await continueCaseIntake(messages);
      setMessages((prev) => [...prev, reply]);
    });
  };

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm">
      <div className="flex items-center justify-between border-b border-border px-4 py-3 md:px-6">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-accent" aria-hidden />
          <div>
            <p className="text-sm font-medium text-foreground">Asistente inicial</p>
            <p className="text-xs text-muted-foreground">Bengolea & Lamas</p>
          </div>
        </div>
        <button
          type="button"
          onClick={reset}
          className="rounded p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label="Reiniciar conversación"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>

      <div ref={scrollRef} className="max-h-[min(55vh,480px)] overflow-y-auto px-4 py-6 md:px-6">
        <div className="space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={cn('flex', m.role === 'user' ? 'justify-end' : 'justify-start')}
            >
              <div
                className={cn(
                  'max-w-[85%] rounded-lg px-4 py-3 text-sm leading-relaxed',
                  m.role === 'user'
                    ? 'bg-foreground text-background'
                    : m.role === 'system'
                      ? 'border border-destructive/30 bg-destructive/5 text-foreground'
                      : 'bg-muted text-foreground',
                )}
              >
                {m.content}
                {m.quickReplies?.length ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {m.quickReplies.map((q) => (
                      <button
                        key={q}
                        type="button"
                        className="rounded border border-border bg-background px-2 py-1 text-xs hover:bg-muted"
                        onClick={() => send(q)}
                        disabled={isPending || isFinished}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          ))}
          {isPending ? (
            <p className="text-xs text-muted-foreground">Escribiendo…</p>
          ) : null}
        </div>
      </div>

      {canRetryEmail ? (
        <div className="border-t border-border px-4 py-3 md:px-6">
          <Button type="button" variant="outline" onClick={retryAfterEmailFailure} disabled={isPending}>
            Reintentar envío al estudio
          </Button>
        </div>
      ) : null}

      {!isFinished && !canRetryEmail ? (
        <form
          className="flex gap-2 border-t border-border p-4 md:p-6"
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
        >
          <label className="sr-only" htmlFor="case-intake-input">
            Tu mensaje
          </label>
          <input
            id="case-intake-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isPending}
            maxLength={8000}
            placeholder="Escribí tu mensaje…"
            className="flex-1 rounded border border-input bg-background px-3 py-2 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-accent"
          />
          <Button type="submit" disabled={isPending || !input.trim()} aria-label="Enviar">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      ) : null}

      {isFinished ? (
        <div className="border-t border-border bg-muted/30 px-4 py-4 text-center text-sm text-muted-foreground md:px-6">
          <p className="font-medium text-foreground">Recibimos tu consulta</p>
          <p className="mt-2">
            El resumen fue enviado al estudio para su revisión. Si necesitamos más datos, te contactaremos.
          </p>
        </div>
      ) : null}

      <p className="border-t border-border px-4 py-3 text-xs leading-relaxed text-muted-foreground md:px-6">
        {CASE_INTAKE_COPY.privacy}{' '}
        <Link href="/privacidad" className="text-accent hover:underline">
          Política de privacidad
        </Link>
      </p>
    </div>
  );
}
