type JsonLdProps = {
  data: object | object[];
};

/** Inserta JSON-LD en el documento (safe para SSR). */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
