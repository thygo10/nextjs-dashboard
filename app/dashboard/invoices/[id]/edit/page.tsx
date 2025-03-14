import Form from '@/app/ui/invoices/edit-form'; // 1. Importa o componente Form para editar uma fatura.
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs'; // 2. Importa o componente Breadcrumbs para navegação.
import { fetchCustomers, fetchInvoiceById } from '@/app/lib/data'; // 3. Importa funções para buscar dados de clientes e faturas.
import { notFound } from 'next/navigation'; // 4. Importa a função notFound para lidar com páginas não encontradas.

export default async function Page(props:{params: Promise<{id: string}>}){ // 5. Define um componente assíncrono chamado Page.
  // 6. A função Page recebe props (propriedades) que incluem params (parâmetros da rota).
  //    "params" é uma promessa que resolve para um objeto com a propriedade "id" (o ID da fatura).
  const params = await props.params; // 7. Espera a promessa de "params" ser resolvida.
  const id = params.id; // 8. Extrai o ID da fatura dos parâmetros.

  // 9. Usa Promise.all para buscar a fatura e a lista de clientes de forma paralela e assíncrona.
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id), // 10. Busca a fatura pelo ID.
    fetchCustomers(), // 11. Busca a lista de clientes.
  ]);

  if (!invoice) { // 12. Verifica se a fatura foi encontrada.
    notFound(); // 13. Se a fatura não foi encontrada, chama a função notFound para exibir uma página 404.
  }

  // 14. Inicia a renderização do componente principal da página.
  return (
    <main>
      <Breadcrumbs // 15. Renderiza o componente Breadcrumbs para navegação.
        breadcrumbs={[ // 16. Define os "breadcrumbs" (caminho de navegação).
          { label: 'Invoices', href: '/dashboard/invoices' }, // 17. Primeiro breadcrumb: "Invoices" com link para a lista de faturas.
          {
            label: 'Edit Invoice', // 18. Segundo breadcrumb: "Edit Invoice".
            href: `/dashboard/invoices/${id}/edit`, // 19. Link para a página de edição da fatura.
            active: true, // 20. Indica que este é o breadcrumb ativo (página atual).
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} /> {/* 21. Renderiza o componente Form para editar a fatura, passando a fatura e a lista de clientes como props.*/}
    </main> // 22. Fecha o elemento main.
  ); // 23. Fecha o bloco de retorno do componente.
} // 24. Fecha a definição do componente Page.