import CardWrapper, { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { fetchLatestInvoices, fetchCardData } from '@/app/lib/data';
import { Suspense } from 'react';
import { CardSkeleton, RevenueChartSkeleton } from '@/app/ui/skeletons';

export default async function Page() {
  // 1. Obtém os dados das últimas faturas de forma assíncrona.
  //    "fetchLatestInvoices" é uma função que busca dados de uma fonte (como um banco de dados) e retorna uma promessa.
  //    "await" espera que essa promessa seja resolvida antes de continuar.
  const latestInvoices = await fetchLatestInvoices();

  // 2. Obtém os dados dos cartões (número de faturas, clientes, total pago e pendente) de forma assíncrona.
  //    Semelhante ao passo 1, "fetchCardData" busca dados e "await" espera a resolução da promessa.
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();

  // 3. Inicia a renderização do componente principal da página.
  return (
    <main>
      {/* 4. Define o título da página usando a fonte "lusitana" e estilos de texto. */}
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>

      {/* 5. Cria um grid para os cartões, organizando-os em colunas responsivas. */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* 6. Usa o componente "Suspense" para lidar com o carregamento dos cartões. */}
        {/* "fallback" define o que será mostrado enquanto os dados são carregados (um esqueleto de cartão). */}
        <Suspense fallback={<CardSkeleton />}>
          {/* 7. Renderiza o componente "CardWrapper", que provavelmente contém os cartões individuais. */}
          <CardWrapper/>
        </Suspense>
      </div>

      {/* 8. Cria um grid para o gráfico de receita e as últimas faturas, organizando-os em colunas responsivas. */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        {/* 9. Usa "Suspense" para lidar com o carregamento do gráfico de receita. */}
        {/* "fallback" define o que será mostrado enquanto os dados são carregados (um esqueleto de gráfico). */}
        <Suspense fallback={<RevenueChartSkeleton />}>
          {/* 10. Renderiza o componente "RevenueChart", que exibe o gráfico de receita. */}
          <RevenueChart />
        </Suspense>

        {/* 11. Renderiza o componente "LatestInvoices", passando os dados das últimas faturas como propriedade. */}
        <LatestInvoices latestInvoices={latestInvoices} />
      </div>
    </main>
  );
}