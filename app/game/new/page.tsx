"use client";
import { useContext, useState } from "react";
import { LevelGameCardProps } from "@/components/level-game-card";
import { useRouter } from "next/navigation";
import { GameContext } from "@/contexts/game-context";
import { SelectLevelStep } from "./_components/select-level-step";
import { SelectQuantityQuestionsStep } from "./_components/select-quantity-questions-step";

export default function NewGamePage() {
  const router = useRouter();

  const handleOnClickLevel = (level: LevelGameCardProps["level"]) => {
    setSelectedLevel(level);
    setStep(1);
  };

  const handleOnConfirm = () => {
    if (selectedLevel) {
      gameContext?.generateGame(selectedLevel, quantity);
      router.push("/game/run");
    }
  };

  const [selectedLevel, setSelectedLevel] = useState<
    LevelGameCardProps["level"] | null
  >(null);

  const levelButtons: Array<LevelGameCardProps> = [
    {
      icon: "circle",
      title: "Fácil",
      description:
        "Uma introdução aos conceitos, com mais dicas e menor complexidade.",
      onClick: handleOnClickLevel,
      buttonTitle: "Iniciar Jogo",
      level: "easy",
    },
    {
      icon: "hexagon",
      title: "Médio",
      description:
        "Um desafio balanceado, ideal para quem já conhece o básico.",
      onClick: handleOnClickLevel,
      buttonTitle: "Iniciar Jogo",
      level: "medium",
    },
    {
      icon: "ink_pen",
      title: "Difícil",
      description:
        "Teste avançado de conhecimento, com menos auxílios e cenários complexos.",
      onClick: handleOnClickLevel,
      buttonTitle: "Iniciar Jogo",
      level: "hard",
    },
  ];

  const gameContext = useContext(GameContext);

  const [step, setStep] = useState(0);
  const [quantity, setQuantity] = useState(10);

  const handleSetQuantityQuestions = (quantity: number) => {
    setQuantity(quantity);
  };

  const switchStep = (position: number) => {
    const step = [
      {
        position: 0,
        component: (
          <SelectLevelStep
            goBack={goHome}
            levelButtons={levelButtons}
          ></SelectLevelStep>
        ),
      },
      {
        position: 1,
        component: (
          <SelectQuantityQuestionsStep
            goBack={goSelectLevel}
            onSetQuantityQuestions={handleSetQuantityQuestions}
            onConfirm={handleOnConfirm}
          ></SelectQuantityQuestionsStep>
        ),
      },
    ];
    return step[position].component;
  };

  const goHome = () => {
    router.push("/");
  };

  const goSelectLevel = () => {
    setStep(0);
  };

  return (
    <div className="relative flex h-auto min-h-screen mx-auto w-full max-w-md flex-col group/design-root  text-slate-800 dark:text-slate-200">
      {switchStep(step)}
    </div>
  );
}
