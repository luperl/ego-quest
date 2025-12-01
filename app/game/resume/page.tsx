"use client";
import { ResumeResult } from "@/components/resume-result";
import { GameContext } from "@/contexts/game-context";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function ResumePage() {
  const context = useContext(GameContext);
  const router = useRouter();

  if (!context) return null;

  const totalScore = context.questionCards.reduce(
    (acc, q) => acc + (q.score || 0),
    0
  );
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
      <div className="flex items-center p-4 pb-2 justify-between">
        <div className="flex size-12 shrink-0 items-center justify-start"></div>
        <h1 className="text-white/90 text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">
          Resultado Final
        </h1>
        <div className="flex w-12 items-center justify-end">
          <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 bg-transparent text-white/90 gap-2 text-base font-bold leading-normal tracking-[0.015em] min-w-0 p-0">
            <span className="material-symbols-outlined text-2xl">share</span>
          </button>
        </div>
      </div>
      <div className="px-4 py-3">
        <ResumeResult score={context.score} totalScore={totalScore} />
      </div>
      <div className="flex flex-wrap gap-4 p-4">
        <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 bg-white/5">
          <p className="text-white/70 text-base font-medium leading-normal">
            Pontuação Total
          </p>
          <p className="text-white tracking-light text-3xl font-bold leading-tight">
            {context.score} / {totalScore}
          </p>
        </div>
      </div>
      <h2 className="text-white/90 text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
        Revisão das Respostas
      </h2>
      <div className="flex flex-col p-4 gap-3">
        {context.reviewAnswers.map((answer, idx) => (
          <details
            key={idx}
            className="flex flex-col rounded-lg border border-white/10 bg-white/5 px-[15px] py-[7px] group"
          >
            <summary className="flex cursor-pointer items-center justify-between gap-6 py-2 list-none">
              <div className="flex items-center gap-3">
                <span
                  className={`material-symbols-outlined ${answer.isCorrect ? "text-[#4CAF50]" : "text-[#F44336]"}`}
                >
                  {answer.isCorrect ? "check_circle" : "cancel"}
                </span>
                <p className="text-white/90 text-sm font-medium leading-normal">
                  Pergunta {idx + 1}
                </p>
              </div>
              <span className="material-symbols-outlined text-white/70 group-open:rotate-180 transition-transform">
                expand_more
              </span>
            </summary>
            <div className="text-white/60 text-sm font-normal leading-normal pb-2 pt-2 border-t border-white/10 mt-2">
              <p className="font-semibold text-white/80 mb-1">
                {answer.question}
              </p>
              <p>
                <span
                  className={
                    answer.isCorrect ? "text-[#4CAF50]" : "text-[#F44336]"
                  }
                >
                  Sua Resposta:
                </span>{" "}
                {answer.userAnswer}{" "}
                {answer.isCorrect ? "(Correta)" : "(Incorreta)"}
              </p>
              {!answer.isCorrect && (
                <p>
                  <span className="text-[#4CAF50]">Resposta Correta:</span>{" "}
                  {answer.correctAnswer}
                </p>
              )}
              {!answer.isCorrect && (
                <p>
                  <span className="text-white">Descrição do mecanismo:</span>{" "}
                  {answer.description}
                </p>
              )}
            </div>
          </details>
        ))}
      </div>
      <div className="flex flex-col gap-3 p-4 pt-6">
        <Link href="/game/new">
          <Button className="flex w-full items-center justify-center rounded-lg bg-primary px-6 py-4 text-center text-base font-bold text-background-dark text-white/80">
            Jogar Novamente
          </Button>
        </Link>

        <Link href="/">
          <Button className="flex w-full items-center justify-center rounded-lg border border-white/20 bg-transparent px-6 py-4 text-center text-base font-bold text-white/80">
            Tela Inicial
          </Button>
        </Link>
      </div>
    </div>
  );
}
