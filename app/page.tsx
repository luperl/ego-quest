"use client";
import { Logo } from "@/components/Logo";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark group/design-root  font-display">
        <main className="flex flex-col flex-grow w-full max-w-md mx-auto ">
          <div className="flex-grow flex flex-col items-center justify-center text-center">
            <Logo />
            <h1 className="text-[#0c0f1d] dark:text-[#F7FAFC] tracking-tight text-5xl font-serif-display font-bold leading-tight">
              EgoQuest
            </h1>
            <p className="text-[#2D3748] dark:text-[#A0AEC0] text-base font-normal leading-normal pt-2 px-4 text-center">
              Explore os mecanismos de defesa do ego.
            </p>
          </div>
          <div className="flex justify-center py-8">
            <div className="flex flex-1 gap-4 max-w-[480px] flex-col items-stretch px-4">
              <Link href="/game/new">
                <Button
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-5 bg-primary text-[#1A202C] text-base font-bold leading-normal tracking-[0.015em] w-full"
                  variant="shadow"
                >
                  <span className="truncate">Novo Jogo</span>
                </Button>
              </Link>

              <Link href="/about-mechanisms">
                <Button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-5 bg-transparent text-[#2D3748] dark:text-[#A0AEC0] text-base font-bold leading-normal tracking-[0.015em] w-full">
                  <span className="truncate">Mecanismos de Defesa</span>
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative w-full aspect-[4/3] -mb-1">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#805AD5] via-[#319795] to-[#ED64A6] opacity-30 dark:opacity-40 blur-3xl"></div>
          </div>
        </main>
      </div>
    </section>
  );
}
