import Link from 'next/link';
import { Logo } from './logo';

const footerSections = [
  {
    title: 'Navegación',
    links: [
      { label: 'Inicio', href: '/' },
      { label: 'Problemas Frecuentes', href: '/#problemas' },
      { label: 'Sobre Mí', href: '/sobre-mi' },
      { label: 'Evaluar Caso', href: '/evaluar-caso' },
    ],
  },
  {
    title: 'Contenido',
    links: [
      { label: 'Fallos Judiciales', href: '/fallos' },
      { label: 'Doctrina Legal', href: '/doctrina' },
      { label: 'Preguntas Frecuentes', href: '/faq' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Política de Privacidad', href: '/privacidad' },
      { label: 'Términos y Condiciones', href: '/terminos' },
    ],
  },
];

export function AppFooter() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 lg:col-span-2 flex flex-col">
            <Logo />
            <p className="mt-4 text-muted-foreground max-w-sm">
              Asesoramiento legal especializado en planes de ahorro para la defensa de sus derechos como consumidor.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
                Atención virtual para toda Argentina.
            </p>
          </div>
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-headline text-sm font-semibold tracking-wider uppercase text-primary">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} JurisPlan. Todos los derechos reservados.</p>
          <p className="mt-1">La información en este sitio no constituye asesoramiento legal. Para una evaluación de su caso, contáctenos.</p>
        </div>
      </div>
    </footer>
  );
}
