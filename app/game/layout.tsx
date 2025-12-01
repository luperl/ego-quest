"use client";

import { withGameContextFilledGuard } from "@/guards/with-game-context-filled-guard";

function GameLayout({ children }: { children: React.ReactNode }) {
  const Guard = withGameContextFilledGuard(() => <>{children}</>);
  return <Guard />;
}

export default GameLayout;
