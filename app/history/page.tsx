export default function HistoryPage() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark group/design-root overflow-x-hidden">
      <div className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between sticky top-0 z-10">
        <div className="flex size-12 shrink-0 items-center justify-start">
          <span className="material-symbols-outlined text-[#0f1223] dark:text-white text-3xl">
            arrow_back
          </span>
        </div>
        <h2 className="text-[#0f1223] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">
          Histórico de Pontuação
        </h2>
        <div className="flex w-12 items-center justify-end">
          <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 text-[#0f1223] dark:text-white gap-2 text-base font-bold leading-normal tracking-[0.015em] min-w-0 p-0">
            <span className="material-symbols-outlined text-3xl">
              pie_chart
            </span>
          </button>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 px-4 py-6">
        <div className="flex w-full flex-1 flex-col gap-2 rounded-lg bg-white dark:bg-gray-800/20 p-6">
          <p className="text-[#0f1223] dark:text-gray-300 text-base font-medium leading-normal">
            Evolução da Pontuação
          </p>
          <p className="text-[#0f1223] dark:text-white tracking-light text-[32px] font-bold leading-tight truncate">
            1450
          </p>
          <div className="flex gap-2 items-center">
            <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">
              Últimos 7 dias
            </p>
            <p className="text-green-500 text-base font-medium leading-normal flex items-center gap-1">
              <span className="material-symbols-outlined text-lg">
                trending_up
              </span>
              +15%
            </p>
          </div>
          <div className="flex min-h-[180px] flex-1 flex-col gap-8 py-4">
            <svg
              fill="none"
              height="148"
              preserveAspectRatio="none"
              viewBox="-3 0 478 150"
              width="100%"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25V149H0V109Z"
                fill="url(#paint0_linear_1131_5935)"
              ></path>
              <path
                d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25"
                stroke="#6179ff"
                stroke-linecap="round"
                stroke-width="3"
              ></path>
            </svg>
            <div className="flex justify-around">
              <p className="text-gray-500 dark:text-gray-400 text-xs font-bold leading-normal tracking-[0.015em]">
                S
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-xs font-bold leading-normal tracking-[0.015em]">
                T
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-xs font-bold leading-normal tracking-[0.015em]">
                Q
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-xs font-bold leading-normal tracking-[0.015em]">
                Q
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-xs font-bold leading-normal tracking-[0.015em]">
                S
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-xs font-bold leading-normal tracking-[0.015em]">
                S
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-xs font-bold leading-normal tracking-[0.015em]">
                D
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 p-4 pt-0">
        <div className="flex items-center justify-start gap-4 rounded-lg bg-white dark:bg-gray-800/20 p-4 shadow-sm">
          <div className="flex w-full grow flex-col items-stretch justify-center gap-1">
            <div className="flex items-center justify-between">
              <p className="text-[#0f1223] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">
                25 de Outubro, 2023
              </p>
              <div className="px-3 py-1 text-sm font-medium rounded-full bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-300">
                Médio
              </div>
            </div>
            <div className="flex items-end gap-6 justify-start mt-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">
                  emoji_events
                </span>
                <p className="text-gray-600 dark:text-gray-300 text-base font-normal leading-normal">
                  1250
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">
                  timer
                </span>
                <p className="text-gray-600 dark:text-gray-300 text-base font-normal leading-normal">
                  05:32
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-start gap-4 rounded-lg bg-white dark:bg-gray-800/20 p-4 shadow-sm">
          <div className="flex w-full grow flex-col items-stretch justify-center gap-1">
            <div className="flex items-center justify-between">
              <p className="text-[#0f1223] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">
                24 de Outubro, 2023
              </p>
              <div className="px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-300">
                Fácil
              </div>
            </div>
            <div className="flex items-end gap-6 justify-start mt-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">
                  emoji_events
                </span>
                <p className="text-gray-600 dark:text-gray-300 text-base font-normal leading-normal">
                  1100
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">
                  timer
                </span>
                <p className="text-gray-600 dark:text-gray-300 text-base font-normal leading-normal">
                  06:15
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-start gap-4 rounded-lg bg-white dark:bg-gray-800/20 p-4 shadow-sm">
          <div className="flex w-full grow flex-col items-stretch justify-center gap-1">
            <div className="flex items-center justify-between">
              <p className="text-[#0f1223] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">
                22 de Outubro, 2023
              </p>
              <div className="px-3 py-1 text-sm font-medium rounded-full bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-300">
                Difícil
              </div>
            </div>
            <div className="flex items-end gap-6 justify-start mt-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">
                  emoji_events
                </span>
                <p className="text-gray-600 dark:text-gray-300 text-base font-normal leading-normal">
                  1300
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">
                  timer
                </span>
                <p className="text-gray-600 dark:text-gray-300 text-base font-normal leading-normal">
                  04:50
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center text-center p-10 mt-8 rounded-lg bg-white dark:bg-gray-800/20">
          <span className="material-symbols-outlined text-5xl text-gray-400 dark:text-gray-500 mb-4">
            history
          </span>
          <p className="text-lg font-semibold text-[#0f1223] dark:text-white">
            Nenhuma partida encontrada
          </p>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Jogue sua primeira partida para ver seu progresso aqui!
          </p>
        </div>
      </div>
    </div>
  );
}
