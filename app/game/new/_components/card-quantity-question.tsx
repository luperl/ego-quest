import { Button } from "@heroui/button";

export interface CardsQuantityQuestionProps {
  isActive: boolean;
  onClick: (quantity: number) => void;
  quantity: number;
  text: string;
}

export const CardsQuantityQuestion = ({
  isActive,
  onClick,
  quantity,
  text,
}: CardsQuantityQuestionProps) => {
  return (
    <Button
      onPress={() => onClick(quantity)}
      className={
        "flex h-auto flex-col items-center justify-center gap-2 rounded-lg py-4 bg-white dark:bg-slate-800/50 shadow-[0_4px_12px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.15)]" +
        (isActive ? " ring-2 ring-primary" : "")
      }
    >
      <span className="text-2xl font-bold leading-tight tracking-[-0.015em] text-primary dark:text-white">
        {quantity}
      </span>
      <span className="text-sm font-normal leading-normal text-slate-500 dark:text-slate-400">
        {text}
      </span>
    </Button>
  );
};
