"use client";
import { LoadingContext } from "@/contexts/loading-context";
import { useContext } from "react";

export const Loading = () => {
  const loadingContext = useContext(LoadingContext);

  return (
    <div
      className={`fixed inset-0 z-[9999]   bg-background-light bg-background dark:bg-background-dark flex h-screen max-h-screen w-full flex-col group/design-root overflow-hidden font-display transition-opacity duration-100
        ${loadingContext?.isLoading ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
    >
      <main className="flex flex-1 flex-col items-center justify-center p-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center animate-pulse">
          <span
            aria-hidden="true"
            className="material-symbols-outlined  text-[#F1FAEE] "
            data-icon="psychology"
            style={{ fontSize: "40px" }}
          >
            psychology
          </span>
          <h1 className="text-[#F1FAEE] tracking-light text-[32px] font-bold leading-tight">
            EgoQuest
          </h1>
        </div>
      </main>
    </div>
  );
};
