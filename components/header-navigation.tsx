"use client";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";

export interface HeaderNavigationProps {
  onClickButton?: () => void;
  icon?: string;
  title: string;
}
export const HeaderNavigation = ({
  onClickButton,
  title,
  icon = "arrow_back",
}: HeaderNavigationProps) => {
  const router = useRouter();

  if (!onClickButton) {
    onClickButton = handleOnClick;
  }
  function handleOnClick() {
    router.back();
  }
  return (
    <div className="flex items-center py-4 pb-2 justify-between sticky top-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm z-10">
      <Button
        onPress={onClickButton}
        className="flex mr-4 size-12 shrink-0 items-center justify-center rounded-full text-slate-700 dark:text-slate-300"
      >
        <span className="material-symbols-outlined">{icon}</span>
      </Button>

      <h1 className="text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">
        {title}
      </h1>
    </div>
  );
};
