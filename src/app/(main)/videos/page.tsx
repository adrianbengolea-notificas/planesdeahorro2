import { permanentRedirect } from 'next/navigation';

/** Sección de videos deshabilitada: Google debe consolidar esta URL en el inicio. */
export default function VideosPage() {
  permanentRedirect('/');
}
