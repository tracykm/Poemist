import { ImmutableArray } from "seamless-immutable"

export interface IPoem {
  id: string
  styleId: number
  backgroundId: number
  colorRange: number
  createdAt: number
  updatedAt: number
  textChunks: ITextChunk[]
  passage: string
  author: Partial<IUser>
  book: IBook
}

export interface IBook {
  author: string
  id: string
  title: string
}

export interface ITextChunk {
  text: string
  isSelected: boolean
}

export interface IUser {
  id: string
  username: string
  sessionToken: string
  poemsWrittenCount: number
  createdAt: number
}

export interface IPagination<T> {
  count: number
  hasMore: boolean
  items: T[]
}

export interface IWordLetter {
  isSelected: boolean
  ch: string
}

export interface ISelectablePoem extends Partial<IPoem> {
  wordLetters: ImmutableArray<IWordLetter[]>
  isSelectingByWord: boolean
}
