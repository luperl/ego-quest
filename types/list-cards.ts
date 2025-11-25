export type Difficulty = "easy" | "medium" | "hard";

export interface Card {
  difficulty: Difficulty;
  text: string;
}

export interface DefenseMechanism {
  name: string;
  cards: Card[];
}

export interface ListCards {
  defenseMechanisms: DefenseMechanism[];
}
