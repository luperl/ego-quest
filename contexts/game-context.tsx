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
  correctAnswer: string;
  isCorrect: boolean;
}

export interface IGameContext {
  reviewAnswers: ReviewAnswer[];
  goToNextQuestion: () => void;
  score: number;
  updateScore: (points: number) => void;
  totalQuestions: number;
  currentQuestionIndex: number;
  level: LevelType;
  setLevel: (level: LevelType) => void;
  questionCards: QuestionCard[];
  setQuestionCards: (level?: LevelType) => void;
  loadQuestionCards: () => void;
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
  const [totalQuestions, setTotalQuestions] = useState(2);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [level, setLevel] = useState<LevelType>("easy");
  const [questionCards, setQuestionCardsState] = useState<QuestionCard[]>([]);

  const updateScore = useCallback((points: number) => {
    setScore((prev) => prev + points);
  }, []);

  const setQuestionCards = useCallback(
    (levelParam?: LevelType) => {
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
      const useLevel: LevelType = levelParam || level;
      const mechanisms = listCards.defenseMechanisms || [];
      type Candidate = { name: string; text: string; level: Difficulty };
      let allowedDifficulties: LevelType[] = [];
      if (useLevel === "easy") allowedDifficulties = ["easy"];
      else if (useLevel === "medium") allowedDifficulties = ["easy", "medium"];
      else allowedDifficulties = ["easy", "medium", "hard"];
      const candidates: Candidate[] = mechanisms.flatMap((m) =>
        (m.cards || [])
          .filter((c) =>
            allowedDifficulties.includes(c.difficulty as LevelType)
          )
          .map((card) => ({
            name: m.name,
            text: card.text,
            level: card.difficulty,
          }))
      );
      const usedQuestions = new Set<string>();
      const allAnswers = candidates.map((c) => c.name);
      const questionCards: QuestionCard[] = [];
      for (const cand of shuffle(candidates).slice(0, totalQuestions)) {
        if (usedQuestions.has(cand.text)) continue;
        usedQuestions.add(cand.text);
        questionCards.push({
          question: cand.text,
          level: cand.level,
          score: QuestionScores[cand.level],
          answer: cand.name,
          options: buildOptions(cand.name, allAnswers),
        });
      }
      setQuestionCardsState(questionCards);
      setTotalQuestions(questionCards.length);
      setCurrentQuestionIndex(0);
    },
    [level]
  );

  const loadQuestionCards = useCallback(() => {
    setQuestionCards(level);
  }, [level, setQuestionCards]);

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
