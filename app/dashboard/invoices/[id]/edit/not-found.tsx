import Link from 'next/link'; // 1. Importa o componente Link do Next.js
import { FaceFrownIcon } from '@heroicons/react/24/outline'; // 2. Importa o ícone de rosto triste do Heroicons.

export default function NotFound() { // 3. Define um componente funcional chamado NotFound.
  return ( // 4. Retorna o JSX que será renderizado.
    <main className="flex h-full flex-col items-center justify-center gap-2"> {/*5. Inicia um elemento <main> com classes de estilo do Tailwind CSS.*/}
      {/* Explicação do estilo:
        - flex: Habilita o layout flexbox.
        - h-full: Define a altura para ocupar toda a tela.
        - flex-col: Organiza os elementos filhos em coluna.
        - items-center: Centraliza os elementos filhos horizontalmente.
        - justify-center: Centraliza os elementos filhos verticalmente.
        - gap-2: Adiciona um espaçamento entre os elementos filhos.
      */}
      <FaceFrownIcon className="w-10 text-gray-400" /> // 6. Renderiza o ícone de rosto triste com classes de estilo.
      {/*
        Explicação do estilo:
        - w-10: Define a largura do ícone para 2.5rem (ou 40px, dependendo da configuração do Tailwind).
        - text-gray-400: Define a cor do ícone para um tom de cinza.
      */}
      <h2 className="text-xl font-semibold">404 Not Found</h2> // 7. Renderiza um título com o texto "404 Not Found".
      {/*
        Explicação do estilo:
        - text-xl: Define o tamanho da fonte como extra grande.
        - font-semibold: Define a espessura da fonte como semibold (semi-negrito).
      */}
      <p>Could not find the requested invoice.</p> // 8. Renderiza um parágrafo com a mensagem de erro.
      <Link // 9. Inicia um componente Link do Next.js para criar um link de navegação.
        href="/dashboard/invoices" // 10. Define o destino do link para a página "/dashboard/invoices".
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400" // 11. Define as classes de estilo para o link.
      >
        {/*
          Explicação do estilo:
          - mt-4: Adiciona margem superior.
          - rounded-md: Adiciona bordas arredondadas.
          - bg-blue-500: Define a cor de fundo como azul.
          - px-4: Adiciona preenchimento horizontal.
          - py-2: Adiciona preenchimento vertical.
          - text-sm: Define o tamanho da fonte como pequeno.
          - text-white: Define a cor do texto como branco.
          - transition-colors: Habilita a transição suave de cores.
          - hover:bg-blue-400: Define a cor de fundo ao passar o mouse.
        */}
        Go Back {/*// 12. Define o texto do link como "Go Back".*/}
      </Link> 
    </main> 
  ); // 15. Fecha o bloco de retorno do componente.
} // 16. Fecha a definição do componente NotFound.