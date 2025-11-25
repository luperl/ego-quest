"use client";
import { GameContextProvider } from "@/contexts/game-context";

export interface GamePageProvidersProps {
  children?: React.ReactNode;
}

export function GamePageProviders({ children }: GamePageProvidersProps) {
  return <GameContextProvider>{children}</GameContextProvider>;
}
