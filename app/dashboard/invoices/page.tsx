import Pagination from '@/app/ui/invoices/pagination'; // Importa o componente de paginação
import Search from '@/app/ui/search'; // Importa o componente de busca
import Table from '@/app/ui/invoices/table'; // Importa o componente da tabela de faturas
import { CreateInvoice } from '@/app/ui/invoices/buttons'; // Importa o botão para criar uma nova fatura
import { lusitana } from '@/app/ui/fonts'; // Importa a fonte personalizada "lusitana"
import { InvoicesTableSkeleton } from '@/app/ui/skeletons'; // Importa um esqueleto de carregamento para a tabela
import { Suspense } from 'react'; // Importa o componente Suspense do React, usado para carregamento assíncrono
import { fetchInvoicesPages } from '@/app/lib/data';

// Define e exporta a função assíncrona Page, que representa a página de faturas
export default async function Page(props:{
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;

}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchInvoicesPages(query);


  return (
    <div className="w-full"> {/* Container principal que ocupa toda a largura */}
      
      {/* Cabeçalho da página */}
      <div className="flex w-full items-center justify-between"> {/* Layout flexível para alinhar os itens */}
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1> {/* Título da página com a fonte "lusitana" e tamanho de texto 2xl */}
      </div>
      
      {/* Barra de busca e botão de criação de fatura */}
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8"> {/* Margem superior e layout flexível */}
        <Search placeholder="Search invoices..." /> {/* Componente de busca com um placeholder personalizado */}
        <CreateInvoice /> {/* Botão para criar uma nova fatura */}
      </div>
      
      {/* Seção da tabela de faturas */}
       <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}> 
        {/* O Suspense renderiza um esqueleto enquanto os dados são carregados */}
        { <Table query={query} currentPage={currentPage} /> } {/* Componente da tabela de faturas */}
      </Suspense> 
      
      {/* Seção da paginação */}
      <div className="mt-5 flex w-full justify-center"> {/* Margem superior e centralização da paginação */}
        {<Pagination totalPages={totalPages} />} {/* Componente de paginação */}
      </div>
    </div>
  );
}