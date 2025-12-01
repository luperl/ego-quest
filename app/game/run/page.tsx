"use client";
import { ButtonGameOption } from "@/components/button-game-option";
import { HeaderGame } from "@/components/header-game";
import { QuestionMechanismCard } from "@/components/question-mechanism-card";
import { GameContext, QuestionCard } from "@/contexts/game-context";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

export default function GamePage() {
  const router = useRouter();
  const context = useContext(GameContext);
  if (!context) return null;

  const {
    currentQuestionIndex,
    questionCards,
    updateCardsAnswer,
    totalQuestions,
    score,
    goToNextQuestion,
  } = context;

  const question = questionCards[currentQuestionIndex] ?? ({} as QuestionCard);

  const [disabledNextButton, setDisabledNextButton] = useState(true);
  const [showButonGoToResume, setShowButonGoToResume] = useState(false);

  const questionOnClick = (option: any, optionIndex: number) => {
    const isCorrect = option.correctAnswer === true;
    updateCardsAnswer(currentQuestionIndex, optionIndex, isCorrect);
    setDisabledNextButton(false);

    if (currentQuestionIndex === totalQuestions - 1) {
      setShowButonGoToResume(true);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      goToNextQuestion();
      setDisabledNextButton(true);

      return;
    }
  };

  const handleGoToResume = () => {
    router.push("/game/resume");
  };

  return (
    <div className="relative flex flex-col h-screen w-full mx-auto max-w-md group/design-root ">
      <HeaderGame
        score={score}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={totalQuestions}
      />
      <main className=" flex flex-col items-center justify-center p-4 pb-12">
        <QuestionMechanismCard text={question.question} />
      </main>
      <footer className="p-4 pt-0">
        <div className="flex flex-1 gap-3 w-full flex-col items-stretch pb-3">
          {question.options?.map((option, index) => (
            <ButtonGameOption
              key={index}
              title={option.title}
              isCorrect={option.isCorret}
              isDisabled={option.isDisabled}
              onPress={() => questionOnClick(option, index)}
            />
          ))}
        </div>
        {showButonGoToResume ? (
          <Button
            className="mt-2 flex min-w-[84px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-5 flex-1 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors"
            variant="shadow"
            onPress={handleGoToResume}
          >
            Ver resultado
          </Button>
        ) : (
          <Button
            className="mt-2 flex min-w-[84px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-5 flex-1 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors"
            variant="shadow"
            isDisabled={
              disabledNextButton || currentQuestionIndex >= totalQuestions - 1
            }
            onPress={handleNextQuestion}
          >
            Próxima questão
          </Button>
        )}
      </footer>
    </div>
  );
}
