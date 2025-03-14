import { Metadata } from 'next';
import { lusitana } from '@/app/ui/fonts';
import CustomersTable from '@/app/ui/customers/table';

import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Clientes',
};

export default async function Page() {
  return (
    <main>
      <div className="mt-4 flex grow flex-col gap-4 md:mt-8">
        <div className="flex h-10 items-end justify-between rounded-lg bg-gray-50 p-4 md:p-6">
          <h1 className={`${lusitana.className} text-2xl`}>Clientes</h1>
        </div>
        <Suspense >
          <CustomersTable />
        </Suspense>
      </div>
    </main>
  );
}
