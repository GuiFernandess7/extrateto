interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function getWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ExtraTeto",
    url: "https://extrateto.org",
    description:
      "Dashboard público que expõe remunerações acima do teto constitucional no sistema de Justiça brasileiro.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://extrateto.org/?search={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function getDatasetJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "Remunerações do Judiciário Brasileiro Acima do Teto Constitucional",
    description:
      "Dados públicos de remuneração de membros do Judiciário e Ministério Público que recebem acima do teto constitucional de R$46.366,19.",
    url: "https://extrateto.org",
    license: "https://creativecommons.org/licenses/by/4.0/",
    creator: {
      "@type": "Organization",
      name: "ExtraTeto",
      url: "https://extrateto.org",
    },
    distribution: {
      "@type": "DataDownload",
      encodingFormat: "application/json",
      contentUrl: "https://extrateto.org/api/v1/membros",
    },
    temporalCoverage: "2024-01/2025-06",
    spatialCoverage: {
      "@type": "Place",
      name: "Brasil",
    },
    variableMeasured: [
      {
        "@type": "PropertyValue",
        name: "remuneracaoTotal",
        description: "Remuneração total mensal em Reais (BRL)",
      },
      {
        "@type": "PropertyValue",
        name: "acimaTeto",
        description: "Valor recebido acima do teto constitucional em Reais (BRL)",
      },
    ],
  };
}

export function getOrgaoJsonLd(orgao: string, estado: string, totalMembros: number) {
  return {
    "@context": "https://schema.org",
    "@type": "GovernmentOrganization",
    name: orgao,
    areaServed: {
      "@type": "State",
      name: estado,
      containedInPlace: {
        "@type": "Country",
        name: "Brasil",
      },
    },
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      value: totalMembros,
    },
  };
}
