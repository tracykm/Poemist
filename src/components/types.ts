import { ImmutableArray } from "seamless-immutable";

export interface IPoem {
  id: number;
  styleId: number;
  backgroundId: number;
  colorRange: number;
  createdAt: number;
  updatedAt: number;
  textChunks: ITextChunk[];
  passage: string;
  author: IUser;
  book: IBook;
}

export interface IBook {
  author: string;
  id: number;
  title: string;
}

export interface ITextChunk {
  text: string;
  isSelected: boolean;
}

export interface IUser {
  id: number;
  username: string;
  sessionToken: string;
}

export interface IPagination<T> {
  count: number;
  hasMore: boolean;
  items: T[];
}

export interface IWordLetter {
  isSelected: boolean;
  ch: string;
}

export interface ISelectablePoem extends Partial<IPoem> {
  wordLetters: ImmutableArray<IWordLetter[]>;
  isBlank: boolean;
  isSelectingByWord: boolean;
}
