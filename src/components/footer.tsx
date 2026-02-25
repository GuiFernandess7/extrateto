import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-12 border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="font-serif text-xl font-bold">
              <span className="text-red-primary">Extra</span>
              <span className="text-navy">Teto</span>
            </h2>
            <p className="mt-1 max-w-md text-xs text-gray-500">
              Ferramenta de fiscalização cidadã que expõe remunerações acima do teto
              constitucional no sistema de Justiça brasileiro. Todos os dados são
              públicos, obtidos via Lei de Acesso à Informação.
            </p>
          </div>

          <div className="flex gap-8 text-xs">
            <div className="flex flex-col gap-2">
              <span className="font-semibold uppercase tracking-wider text-gray-400">
                Navegação
              </span>
              <Link href="/" className="text-gray-600 hover:text-navy">
                Ranking
              </Link>
              <Link href="/mapa" className="text-gray-600 hover:text-navy">
                Mapa
              </Link>
              <Link href="/estatisticas" className="text-gray-600 hover:text-navy">
                Estatísticas
              </Link>
              <Link href="/orgao" className="text-gray-600 hover:text-navy">
                Órgãos
              </Link>
              <Link href="/metodologia" className="text-gray-600 hover:text-navy">
                Metodologia
              </Link>
              <Link href="/api-docs" className="text-gray-600 hover:text-navy">
                API
              </Link>
              <Link href="/sobre" className="text-gray-600 hover:text-navy">
                Sobre
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-semibold uppercase tracking-wider text-gray-400">
                Fontes
              </span>
              <a
                href="https://dadosjusbr.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-navy"
              >
                DadosJusBr
              </a>
              <a
                href="https://cnj.jus.br"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-navy"
              >
                CNJ
              </a>
              <a
                href="https://cnmp.mp.br"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-navy"
              >
                CNMP
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-100 pt-4 text-[11px] text-gray-400">
          <p>
            Os dados apresentados são obtidos de fontes públicas oficiais. Erros podem
            existir nos dados originais. Este projeto não faz juízo de valor sobre a
            legalidade das remunerações — apenas apresenta os dados para que o cidadão
            tire suas conclusões.
          </p>
          <p className="mt-2">
            Teto constitucional 2025: R$46.366,19/mês (salário de ministro do STF) &middot;
            ARE 652777/SP &middot; Lei 12.527/2011
          </p>
        </div>
      </div>
    </footer>
  );
}
