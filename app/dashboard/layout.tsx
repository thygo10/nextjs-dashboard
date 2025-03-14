import SideNav from '@/app/ui/dashboard/sidenav'; {/* Importa o componente SideNav, que representa a barra de navegação lateral */}
export const experimental_ppr = true; {/* Habilita o Progressive Partial Rendering (PPR) experimental do Next.js */}
 
export default function Layout({ children }: { children: React.ReactNode }) { {/* Define um componente funcional Layout que recebe children como prop */}
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden"> {/* Inicia um div com classes do Tailwind CSS para layout flexível */}
      {/*
        - flex: Habilita o layout flexbox.
        - h-screen: Define a altura para ocupar toda a tela.
        - flex-col: Organiza os elementos filhos em coluna (em telas pequenas).
        - md:flex-row: Organiza os elementos filhos em linha (em telas médias e maiores).
        - md:overflow-hidden: Oculta o overflow horizontal em telas médias e maiores.
      */}
      <div className="w-full flex-none md:w-64"> {/* Inicia um div para a barra de navegação lateral */}
        {/*
          - w-full: Ocupa toda a largura em telas pequenas.
          - flex-none: Impede que o flexbox encolha este elemento.
          - md:w-64: Define a largura para 64 unidades (geralmente 16rem ou 256px) em telas médias e maiores.
        */}
        <SideNav /> {/* Renderiza o componente SideNav (barra de navegação lateral) */}
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div> {/* Inicia um div para o conteúdo principal */}
      {/*
        - flex-grow: Permite que este elemento cresça para ocupar o espaço restante.
        - p-6: Adiciona preenchimento de 6 unidades (geralmente 1.5rem ou 24px) em todas as direções.
        - md:overflow-y-auto: Adiciona scroll vertical se o conteúdo exceder a altura em telas médias e maiores.
        - md:p-12: Adiciona preenchimento de 12 unidades (geralmente 3rem ou 48px) em todas as direções em telas médias e maiores.
        - {children}: Renderiza os componentes filhos passados como prop.
      */}
    </div>
  );
}

