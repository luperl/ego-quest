export interface QuestionMechanismCardProps {
  text: string;
}

export const QuestionMechanismCard = ({ text }: QuestionMechanismCardProps) => {
  return (
    <div className="w-full bg-slate-50 dark:bg-slate-800 rounded-lg p-6 shadow-lg">
      <div className="flex flex-col items-stretch justify-center gap-3">
        <h3 className="text-gray-800 dark:text-gray-100 text-xl font-bold leading-tight tracking-[-0.015em]">
          Qual mecanismo de defesa é este?
        </h3>
        <div className="flex flex-col gap-2">
          <p className="text-gray-600 dark:text-gray-400 text-base font-normal leading-normal">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
};
