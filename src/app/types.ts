export interface GameData {
    categories: Array<GameLevel>;
}

export interface GameAuthor {
    name: string;
    link?: string|null;
}

export interface GameLevel {
    level: number;
    members: Array<string>;
    title: string;
}

export interface GameItem {
    level: number;
    title: string;
    selected: boolean;
    id: number;
    mistake: boolean;
}

export interface GameHistory {
    moves: string;
    mistakes: number;
    hasWon: boolean;
    timeCompleted: Date;
}