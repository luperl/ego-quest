"use client";
import { LevelType } from "@/components/level-game-card";
import React, { createContext, useState, useCallback } from "react";
import { listCards } from "@/data/indext";
import { Difficulty } from "@/types/list-cards";
import { shuffle } from "@/utils/shuffle";

export interface QuestionOption {
  title: string;
  correctAnswer: boolean;
  isCorret: boolean | null;
  isDisabled: boolean;
}
export interface QuestionCard {
  answer: string;
  level: Difficulty;
  question: string;
  description: string;
  options: QuestionOption[];
  score: number;
}

export const QuestionScores: Record<Difficulty, number> = {
  easy: 10,
  medium: 20,
  hard: 30,
};

export interface ReviewAnswer {
  question: string;
  userAnswer: string;
  description: string;
  correctAnswer: string;
  isCorrect: boolean;
}

export interface IGameContext {
  reviewAnswers: ReviewAnswer[];
  goToNextQuestion: () => void;
  score: number;
  updateScore: (points: number) => void;
  totalQuestions: number;
  setTotalQuestions: (total: number) => void;
  currentQuestionIndex: number;
  level: LevelType;
  setLevel: (level: LevelType) => void;
  questionCards: QuestionCard[];
  setQuestionCards: (level?: LevelType, quantity?: number) => void;
  loadQuestionCards: (quantity?: number) => void;
  updateCardsAnswer: (
    questionIndex: number,
    optionIndex: number,
    isCorrect: boolean
  ) => void;
}

export const GameContext = createContext<IGameContext | undefined>(undefined);

export function GameContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [reviewAnswers, setReviewAnswers] = useState<ReviewAnswer[]>([]);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(10);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [level, setLevel] = useState<LevelType>("easy");
  const [questionCards, setQuestionCardsState] = useState<QuestionCard[]>([]);

  const updateScore = useCallback((points: number) => {
    setScore((prev) => prev + points);
  }, []);

  function buildOptions(
    correct: string,
    allAnswers: string[]
  ): QuestionOption[] {
    const wrongs = shuffle(allAnswers.filter((a) => a !== correct));
    const rawOptions = shuffle([correct, ...wrongs.slice(0, 2)]);
    const uniqueOptions = Array.from(new Set(rawOptions));
    return uniqueOptions.map((opt) => ({
      title: opt,
      correctAnswer: opt === correct,
      isCorret: null,
      isDisabled: false,
    }));
  }

  function getAllowedDifficulties(level: LevelType): LevelType[] {
    if (level === "easy") return ["easy"];
    if (level === "medium") return ["medium"];
    return ["hard"];
  }

  function getCandidates(
    mechanisms: typeof listCards.defenseMechanisms,
    allowedDifficulties: LevelType[]
  ): Array<{
    name: string;
    text: string;
    level: Difficulty;
    description: string;
  }> {
    return mechanisms.flatMap((m) =>
      Object.entries(m.cards).flatMap(([difficulty, cards]) =>
        allowedDifficulties.includes(difficulty as LevelType)
          ? (
              cards as {
                text: string;
                difficulty: Difficulty;
                description?: string;
              }[]
            ).map((card) => ({
              name: m.name,
              text: card.text,
              level: card.difficulty,
              description: card.description || m.description || "",
            }))
          : []
      )
    );
  }

  function buildQuestionCards(
    candidates: Array<{
      name: string;
      text: string;
      level: Difficulty;
      description: string;
    }>,
    quantity: number
  ): QuestionCard[] {
    const usedQuestions = new Set<string>();
    const allAnswers = candidates.map((c) => c.name);
    const questionCards: QuestionCard[] = [];
    for (const cand of shuffle(candidates).slice(0, quantity)) {
      if (usedQuestions.has(cand.text)) continue;
      usedQuestions.add(cand.text);
      questionCards.push({
        question: cand.text,
        level: cand.level,
        description: cand.description,
        score: QuestionScores[cand.level],
        answer: cand.name,
        options: buildOptions(cand.name, allAnswers),
      });
    }
    return questionCards;
  }

  const setQuestionCards = useCallback(
    (levelParam?: LevelType, quantityParam?: number) => {
      const useLevel: LevelType = levelParam || level;
      const mechanisms = listCards.defenseMechanisms || [];
      const allowedDifficulties = getAllowedDifficulties(useLevel);
      const candidates = getCandidates(mechanisms, allowedDifficulties);
      const questionCount = quantityParam ?? totalQuestions;
      const questionCards = buildQuestionCards(candidates, questionCount);
      setQuestionCardsState(questionCards);
      setTotalQuestions(questionCards.length);
      setCurrentQuestionIndex(0);
    },
    [level, totalQuestions]
  );

  const loadQuestionCards = useCallback(
    (quantity?: number) => {
      setQuestionCards(level, quantity);
    },
    [level, setQuestionCards]
  );

  const updateCardsAnswer = useCallback(
    (questionIndex: number, optionIndex: number, isCorrect: boolean) => {
      setQuestionCardsState((prevCards) => {
        const questionCard = prevCards[questionIndex];
        if (!questionCard) return prevCards;
        const updatedOptions = questionCard.options.map((opt, idx) => {
          if (idx === optionIndex) {
            return { ...opt, isCorret: isCorrect, isDisabled: true };
          }
          return { ...opt, isDisabled: true };
        });
        const updatedCards = [...prevCards];
        updatedCards[questionIndex] = {
          ...questionCard,
          options: updatedOptions,
        };
        return updatedCards;
      });
      setReviewAnswers((prev: ReviewAnswer[]) => {
        const questionCard = questionCards[questionIndex];
        if (!questionCard) return prev;
        const userOption = questionCard.options[optionIndex];
        const alreadyAnswered = prev.find(
          (r: ReviewAnswer) => r.question === questionCard.question
        );
        if (alreadyAnswered) {
          return prev.map((r: ReviewAnswer) =>
            r.question === questionCard.question
              ? {
                  question: questionCard.question,
                  userAnswer: userOption.title,
                  description: questionCard.description,
                  correctAnswer: questionCard.answer,
                  isCorrect: isCorrect,
                }
              : r
          );
        }
        return [
          ...prev,
          {
            question: questionCard.question,
            userAnswer: userOption.title,
            description: questionCard.description,
            correctAnswer: questionCard.answer,
            isCorrect: isCorrect,
          },
        ];
      });
      if (isCorrect) {
        updateScore(questionCards[questionIndex]?.score || 0);
      }
    },
    [updateScore, questionCards]
  );

  const goToNextQuestion = () => {
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  const value: IGameContext = {
    score,
    updateScore,
    totalQuestions,
    setTotalQuestions,
    currentQuestionIndex,
    level,
    setLevel,
    questionCards,
    setQuestionCards,
    loadQuestionCards,
    updateCardsAnswer,
    reviewAnswers,
    goToNextQuestion,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
