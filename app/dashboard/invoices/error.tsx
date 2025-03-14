'use client'; // 1. Marca o componente como um componente cliente no Next.js.

import { useEffect } from 'react'; // 2. Importa o hook useEffect do React.

export default function Error({ // 3. Define um componente funcional chamado Error.
  error, // 4. Recebe a propriedade "error" (o objeto de erro).
  reset, // 5. Recebe a propriedade "reset" (uma função para tentar recuperar do erro).
}: { // 6. Define os tipos das propriedades (TypeScript).
  error: Error & { digest?: string }; // 7. O erro é um objeto Error, com um digest opcional.
  reset: () => void; // 8. O reset é uma função que não recebe argumentos e não retorna nada.
}) {
  useEffect(() => { // 9. Usa o hook useEffect para executar um efeito colateral após a renderização.
    // Optionally log the error to an error reporting service
    console.error(error); // 10. Loga o erro no console (útil para depuração).
  }, [error]); // 11. O efeito é executado sempre que a propriedade "error" muda.

  return ( // 12. Retorna o JSX que será renderizado.
    <main className="flex h-full flex-col items-center justify-center"> {/* 13. Inicia um elemento <main> com classes de estilo do Tailwind CSS.*/}
      {/* Explicação do estilo:
        - flex: Habilita o layout flexbox.
        - h-full: Define a altura para ocupar toda a tela.
        - flex-col: Organiza os elementos filhos em coluna.
        - items-center: Centraliza os elementos filhos horizontalmente.
        - justify-center: Centraliza os elementos filhos verticalmente.
      */}
      <h2 className="text-center">Something went wrong!</h2> // 14. Renderiza um título com a mensagem de erro.
      {/*
        Explicação do estilo:
        - text-center: Centraliza o texto.
      */}
      <button // 15. Renderiza um botão.
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400" // 16. Define as classes de estilo para o botão.
        onClick={ // 17. Define o manipulador de evento onClick para o botão.
          // Attempt to recover by trying to re-render the invoices route
          () => reset() // 18. Chama a função "reset" para tentar recuperar do erro.
        }
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
        Try again {/* 19. Define o texto do botão como "Try again".*/}
      </button> {/* 20. Fecha o elemento button.*/}
    </main> // 21. Fecha o elemento <main>.
  ); // 22. Fecha o bloco de retorno do componente.
} // 23. Fecha a definição do componente Error.