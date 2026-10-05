import Link from 'next/link';
import { SITE_NAME, socialLinks } from '@/config/site';
import {
  formatStudioAddressLine,
  STUDIO_EMAIL,
  STUDIO_PHONES,
  STUDIO_WHATSAPP_DISPLAY,
  STUDIO_WHATSAPP_URL,
  studioMapsSearchUrl,
  studioPhoneE164,
} from '@/config/wix-brand';

const footerLinks = [
  { label: 'Estudio', href: '/estudio' },
  { label: 'Servicios', href: '/servicios' },
  { label: 'Áreas de práctica', href: '/areas-de-practica' },
  { label: 'Profesionales', href: '/profesionales' },
  { label: 'Publicaciones', href: '/publicaciones' },
  { label: 'Preguntas frecuentes', href: '/preguntas-frecuentes' },
  { label: 'Contacto', href: '/contacto' },
  { label: 'Privacidad', href: '/privacidad' },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12 md:py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="font-headline text-lg font-semibold">{SITE_NAME}</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-primary-foreground/70">
              Asesoramiento jurídico en San Nicolás de los Arroyos y región. Derecho civil, comercial y defensa del
              consumidor.
            </p>
            <address className="mt-6 space-y-2 text-sm not-italic text-primary-foreground/55">
              <p>
                <a
                  href={studioMapsSearchUrl()}
                  className="hover:text-primary-foreground"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {formatStudioAddressLine()}
                </a>
              </p>
              <p>
                {STUDIO_PHONES.map((tel, i) => (
                  <span key={tel}>
                    {i > 0 ? ' · ' : null}
                    <a href={`tel:${studioPhoneE164(tel)}`} className="hover:text-primary-foreground">
                      {tel}
                    </a>
                  </span>
                ))}
              </p>
              <p>
                <a href={`mailto:${STUDIO_EMAIL}`} className="hover:text-primary-foreground">
                  {STUDIO_EMAIL}
                </a>
              </p>
              <p>
                WhatsApp:{' '}
                <a
                  href={STUDIO_WHATSAPP_URL}
                  className="hover:text-primary-foreground"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {STUDIO_WHATSAPP_DISPLAY}
                </a>
              </p>
            </address>
          </div>
          <nav aria-label="Enlaces del sitio">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Secciones</h2>
            <ul className="mt-4 space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/65 transition-colors hover:text-primary-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Redes</h2>
            <p className="mt-4 text-sm text-primary-foreground/55">
              {socialLinks.facebook ? (
                <a
                  href={socialLinks.facebook}
                  className="hover:text-primary-foreground"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
              ) : (
                'Facebook institucional pendiente de confirmar.'
              )}
            </p>
            <p className="mt-6 text-xs text-primary-foreground/45">
              Las matrículas individuales se publican en cada perfil cuando están validadas.
            </p>
          </div>
        </div>
        <p className="mt-10 border-t border-primary-foreground/10 pt-6 text-xs text-primary-foreground/45">
          © {new Date().getFullYear()} {SITE_NAME}. La información publicada es divulgativa y no reemplaza asesoramiento
          sobre un caso concreto.
        </p>
      </div>
    </footer>
  );
}
