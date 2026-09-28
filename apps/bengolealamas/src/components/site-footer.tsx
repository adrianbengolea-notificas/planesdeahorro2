import Link from 'next/link';
import { SITE_NAME } from '@/config/site';

const footerLinks = [
  { label: 'Estudio', href: '/estudio' },
  { label: 'Áreas de práctica', href: '/areas-de-practica' },
  { label: 'Publicaciones', href: '/publicaciones' },
  { label: 'Jurisprudencia', href: '/jurisprudencia' },
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
            <p className="mt-3 max-w-sm text-sm text-primary-foreground/70 leading-relaxed">
              Asesoramiento jurídico en San Nicolás de los Arroyos y región. Derecho civil, comercial y defensa del
              consumidor.
            </p>
            <dl className="mt-6 space-y-2 text-sm text-primary-foreground/55">
              <div>
                <dt className="sr-only">Domicilio</dt>
                <dd>Domicilio — a confirmar</dd>
              </div>
              <div>
                <dt className="sr-only">Teléfono</dt>
                <dd>Teléfono — a confirmar</dd>
              </div>
              <div>
                <dt className="sr-only">Correo electrónico</dt>
                <dd>Email — a confirmar</dd>
              </div>
            </dl>
          </div>
          <nav aria-label="Enlaces del sitio">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Secciones</h2>
            <ul className="mt-4 space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/65 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Redes</h2>
            <p className="mt-4 text-sm text-primary-foreground/55">Enlaces a redes sociales — a confirmar</p>
            <p className="mt-6 text-xs text-primary-foreground/45">
              Matrículas y datos profesionales — a publicar cuando estén validados.
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
