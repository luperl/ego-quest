import { Button } from "@heroui/button";

export interface ButtonGameOptionProps {
  title: string;
  isCorrect: boolean | null;
  onPress?: () => void;
  isDisabled?: boolean;
}

export const ButtonGameOption = ({
  title,
  isCorrect,
  onPress,
  isDisabled = false,
}: ButtonGameOptionProps) => {
  function getClassIsCorrect(isCorrect: boolean | null) {
    if (isCorrect === null) {
      return "bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600";
    }

    return isCorrect
      ? "bg-green-600 dark:bg-green-800 hover:bg-green-700 dark:hover:bg-green-700"
      : "bg-rose-600 dark:bg-rose-800 hover:bg-rose-700 dark:hover:bg-rose-700";
  }

  const bgClass = getClassIsCorrect(isCorrect);
  return (
    <Button
      isDisabled={isDisabled}
      className={
        "flex min-w-[84px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-5  text-gray-800 dark:text-gray-100 text-base font-bold leading-normal tracking-[0.015em]  transition-colors " +
        bgClass
      }
      onPress={onPress}
    >
      <span className="truncate">{title}</span>
    </Button>
  );
};
