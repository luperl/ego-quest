import {
  LevelGameCard,
  LevelGameCardProps,
} from "@/components/level-game-card";
import { Button } from "@heroui/button";

export default function NewGamePage() {
  const levelButtons: Array<LevelGameCardProps> = [
    {
      icon: "circle",
      title: "Fácil",
      description:
        "Uma introdução aos conceitos, com mais dicas e menor complexidade.",
      href: "/game/run",
      buttonTitle: "Iniciar Jogo",
      level: "easy",
    },
    {
      icon: "hexagon",
      title: "Médio",
      description:
        "Um desafio balanceado, ideal para quem já conhece o básico.",
      href: "/game/run",
      buttonTitle: "Iniciar Jogo",
      level: "medium",
    },
    {
      icon: "ink_pen",
      title: "Difícil",
      description:
        "Teste avançado de conhecimento, com menos auxílios e cenários complexos.",
      href: "/game/run",
      buttonTitle: "Iniciar Jogo",
      level: "hard",
    },
  ];

  return (
    <div className="relative flex h-auto min-h-screen mx-auto w-full max-w-md flex-col group/design-root  text-slate-800 dark:text-slate-200">
      <div className="flex items-center p-4 pb-2 justify-between sticky top-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm z-10">
        <Button className="flex size-12 shrink-0 items-center justify-center rounded-full text-slate-700 dark:text-slate-300">
          <span className="material-symbols-outlined">arrow_back</span>
        </Button>
        <h1 className="text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">
          Escolha o seu desafio
        </h1>
      </div>

      <main className="flex flex-col gap-4 p-4 pt-6">
        {levelButtons.map((level, index) => (
          <LevelGameCard key={index} {...level} />
        ))}
      </main>
    </div>
  );
}
