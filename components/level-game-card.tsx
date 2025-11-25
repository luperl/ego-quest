"use client";
import { GameContext } from "@/contexts/game-context";
import { Difficulty } from "@/types/list-cards";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export type LevelType = Difficulty;
export interface LevelGameCardProps {
  icon: string;
  title: string;
  description: string;
  href: string;
  buttonTitle: string;
  level: LevelType;
}

export const LevelGameCard = ({
  icon,
  title,
  description,
  href,
  buttonTitle,
  level,
}: LevelGameCardProps) => {
  const router = useRouter();
  const gameContext = useContext(GameContext);

  const handleClick = () => {
    gameContext?.setLevel(level);
    gameContext?.loadQuestionCards();
    router.push(href);
  };

  return (
    <div className="flex flex-col items-stretch justify-start rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.15)] bg-white dark:bg-slate-800/50 p-4 gap-4">
      <div className="flex items-center gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary dark:text-white">
          <span className="material-symbols-outlined text-3xl">{icon}</span>
        </div>
        <div className="flex flex-col">
          <p className="text-lg font-bold leading-tight tracking-[-0.015em]">
            {title}
          </p>
          <p className="text-sm font-normal leading-normal text-slate-500 dark:text-slate-400">
            {description}
          </p>
        </div>
      </div>

      <Button
        className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-6 bg-primary text-white text-base font-medium leading-normal hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark transition-colors"
        onPress={handleClick}
      >
        <span className="truncate">{buttonTitle}</span>
      </Button>
    </div>
  );
};
