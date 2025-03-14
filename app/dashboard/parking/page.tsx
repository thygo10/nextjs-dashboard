/*
quero fazer um programa de monitoramento de estacionamento
quero renderizar 100 por pagina, no total quero 200 quadradinhos, que quando estiver oculpado, ficara vermelho, e livre verde.
essa verificacao sera feita na pagina de invoice, ao criar uma nova venda, verifico quantos estao disponiveis, e so consigo fazer uma venda, para o espaco disponivel
o valor padrao sera 5 reais, por 12h, 
tem que ser responsivo, em telas menores, quero habilitar paginacao
*/

import { lusitana } from '@/app/ui/fonts';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { ParkingTable } from '@/app/ui/parking/parking-table';
import ParkingTableSkeleton from '@/app/ui/skeletons';

export const metadata: Metadata = {
  title: 'Estacionamento',
};

export default async function Page() {
  return (
    <main>
      <div className="mt-4 flex grow flex-col gap-4 md:mt-8">
        <div className="flex h-10 items-end justify-between rounded-lg bg-gray-50 p-4 md:p-6">
          <h1 className={`${lusitana.className} text-2xl`}>
            Estacionamento
          </h1>
        </div>
        <Suspense fallback={<ParkingTableSkeleton />}>
          <ParkingTable />
        </Suspense>
      </div>
    </main>
  );
}

