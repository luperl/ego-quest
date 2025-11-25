"use client";
export interface Status {
  icon: string;
  color: string;
  bg: string;
  title: string;
  description: string | null;
}

export type ResumeStatus = "bad" | "medium" | "good" | "excellent";

export interface ResumeResultProps {
  score: number;
  totalScore: number;
  status?: ResumeStatus;
}

export const ResumeResult = ({
  score,
  totalScore,
  status,
}: ResumeResultProps) => {
  const statusMap: Record<ResumeStatus, Status> = {
    bad: {
      icon: "published_with_changes",
      color: "text-warning",
      bg: "bg-warning/10",
      title: "Quase lá!",
      description: "Continue estudando e tente novamente.",
    },
    medium: {
      icon: "trending_up",
      color: "text-yellow-400",
      bg: "bg-white/5",
      title: "Quase lá!",
      description: null,
    },
    good: {
      icon: "emoji_events",
      color: "text-primary",
      bg: "bg-primary/10",
      title: "Ótimo trabalho!",
      description: null,
    },
    excellent: {
      icon: "military_tech",
      color: "text-yellow-400",
      bg: "bg-primary/10",
      title: "Mestre do Ego!",
      description:
        "Sua jornada pelo autoconhecimento é inspiradora. Você dominou os mecanismos de defesa!",
    },
  };

  let computedStatus: ResumeStatus = "bad";
  const percent = totalScore > 0 ? (score / totalScore) * 100 : 0;
  if (percent < 10) computedStatus = "bad";
  else if (percent <= 45) computedStatus = "medium";
  else if (percent <= 99) computedStatus = "good";
  else if (percent === 100) computedStatus = "excellent";
  const selectedStatus = statusMap[status ?? computedStatus];

  return (
    <div
      className={`${selectedStatus.bg} flex flex-col items-center justify-center gap-4 overflow-hidden rounded-lg min-h-[180px]`}
    >
      <span
        className={`material-symbols-outlined !text-7xl ${selectedStatus.color}`}
      >
        {selectedStatus.icon}
      </span>
      <p className="text-white tracking-light text-[28px] font-bold leading-tight">
        {selectedStatus.title}
      </p>
      <p className="text-white/70 text-base -mt-2 px-4 text-center">
        {selectedStatus.description}
      </p>
    </div>
  );
};
