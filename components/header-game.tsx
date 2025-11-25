export interface HeaderGameProps {
  score: number;
  questionNumber: number;
  totalQuestions: number;
}

export const HeaderGame = ({
  score,
  questionNumber,
  totalQuestions,
}: HeaderGameProps) => {
  return (
    <header className="flex items-center p-4 pb-2 justify-between shrink-0">
      <div className="flex items-center gap-2 text-white/90">
        <span className="material-symbols-outlined text-3xl text-primary">
          workspace_premium
        </span>
        <span className="text-lg font-bold">Pontos: {score}</span>
      </div>
      <h2 className="text-white/90 text-lg font-bold leading-tight tracking-[-0.015em]">
        {questionNumber}/{totalQuestions}
      </h2>
    </header>
  );
};
