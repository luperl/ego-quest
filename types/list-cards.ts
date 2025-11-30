export type Difficulty = "easy" | "medium" | "hard";

export interface Card {
  difficulty: Difficulty;
  text: string;
}

export interface DefenseMechanism {
  name: string;
  description: string;
  cards: {
    easy: Card[];
    medium: Card[];
    hard: Card[];
  };
}

export interface ListCards {
  defenseMechanisms: DefenseMechanism[];
}
