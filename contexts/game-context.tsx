"use client";
import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { listCards } from "@/data/indext";
import { Difficulty } from "@/types/list-cards";
import { LevelType } from "@/components/level-game-card";

/* ------------------------------------------------------
   TYPES
------------------------------------------------------ */

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
  totalQuestions: number;
  level: LevelType;
  currentQuestionIndex: number;

  generateGame: (level: LevelType, quantity: number) => void;
  updateCardsAnswer: (
    questionIndex: number,
    optionIndex: number,
    isCorrect: boolean
  ) => void;

  questionCards: QuestionCard[];
}

export const GameContext = createContext<IGameContext | undefined>(undefined);

/* ------------------------------------------------------
   CACHE — PREPARED ONCE
------------------------------------------------------ */

type Candidate = {
  name: string;
  text: string;
  level: Difficulty;
  description: string;
};

const candidatesCache: Record<Difficulty, Candidate[]> = {
  easy: [],
  medium: [],
  hard: [],
};

let cachePrepared = false;

function prepareCandidates() {
  if (cachePrepared) return;

  for (const mechanism of listCards.defenseMechanisms) {
    for (const [difficulty, cards] of Object.entries(mechanism.cards)) {
      const level = difficulty as Difficulty;

      for (const card of cards as any[]) {
        candidatesCache[level].push({
          name: mechanism.name,
          text: card.text,
          level: card.difficulty,
          description: card.description || mechanism.description || "",
        });
      }
    }
  }

  cachePrepared = true;
}

/* ------------------------------------------------------
   UTILS
------------------------------------------------------ */

function pickRandomItems<T>(arr: T[], count: number): T[] {
  if (count >= arr.length) return arr.slice();

  const result: T[] = [];
  const used = new Uint8Array(arr.length);

  while (result.length < count) {
    const idx = Math.floor(Math.random() * arr.length);
    if (!used[idx]) {
      used[idx] = 1;
      result.push(arr[idx]);
    }
  }
  return result;
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildOptions(answer: string, pool: string[]): QuestionOption[] {
  const options = new Set<string>();
  options.add(answer);

  while (options.size < 3) {
    const r = pool[Math.floor(Math.random() * pool.length)];
    if (r !== answer) options.add(r);
  }

  // embaralha posições (correta pode ser 0, 1 ou 2)
  const shuffled = shuffleArray(Array.from(options));

  return shuffled.map((opt) => ({
    title: opt,
    correctAnswer: opt === answer,
    isCorret: null,
    isDisabled: false,
  }));
}

function buildQuestionCards(
  level: LevelType,
  quantity: number
): QuestionCard[] {
  const allowed: Difficulty[] =
    level === "easy" ? ["easy"] : level === "medium" ? ["medium"] : ["hard"];

  const pool = allowed.flatMap((l) => candidatesCache[l]);
  if (!pool.length) return [];

  const selected = pickRandomItems(pool, quantity);
  const answerPool = pool.map((c) => c.name);

  return selected.map((cand) => ({
    question: cand.text,
    level: cand.level,
    description: cand.description,
    score: QuestionScores[cand.level],
    answer: cand.name,
    options: buildOptions(cand.name, answerPool),
  }));
}

/* ------------------------------------------------------
   PROVIDER
------------------------------------------------------ */

export function GameContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => prepareCandidates(), []);

  const [reviewAnswers, setReviewAnswers] = useState<ReviewAnswer[]>([]);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [level, setLevel] = useState<LevelType>("easy");
  const [questionCards, setQuestionCards] = useState<QuestionCard[]>([]);

  const generateGame = useCallback((level: LevelType, quantity: number) => {
    const cards = buildQuestionCards(level, quantity);

    setLevel(level);
    setTotalQuestions(cards.length);
    setCurrentQuestionIndex(0);
    setQuestionCards(cards);
    setScore(0);
    setReviewAnswers([]);
  }, []);

  const updateCardsAnswer = useCallback(
    (qIndex: number, oIndex: number, isCorrect: boolean) => {
      setQuestionCards((prev) => {
        const cards = [...prev];
        const q = cards[qIndex];
        if (!q) return prev;

        const updatedOptions = q.options.map((opt, i) => ({
          ...opt,
          isCorret: i === oIndex ? isCorrect : opt.isCorret,
          isDisabled: true,
        }));

        cards[qIndex] = { ...q, options: updatedOptions };
        return cards;
      });

      setReviewAnswers((prev) => {
        const q = questionCards[qIndex];
        if (!q) return prev;

        const entry: ReviewAnswer = {
          question: q.question,
          userAnswer: q.options[oIndex].title,
          description: q.description,
          correctAnswer: q.answer,
          isCorrect,
        };

        const exists = prev.some((v) => v.question === q.question);
        return exists
          ? prev.map((v) => (v.question === q.question ? entry : v))
          : [...prev, entry];
      });

      if (isCorrect) {
        const pts = questionCards[qIndex]?.score ?? 0;
        setScore((s) => s + pts);
      }
    },
    [questionCards]
  );

  const goToNextQuestion = useCallback(() => {
    setCurrentQuestionIndex((i) => i + 1);
  }, []);

  const value = useMemo<IGameContext>(
    () => ({
      reviewAnswers,
      goToNextQuestion,

      score,
      totalQuestions,
      level,
      currentQuestionIndex,

      questionCards,
      generateGame,
      updateCardsAnswer,
    }),
    [
      reviewAnswers,
      goToNextQuestion,
      score,
      totalQuestions,
      level,
      currentQuestionIndex,
      questionCards,
      generateGame,
      updateCardsAnswer,
    ]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
