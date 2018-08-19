export interface IPoem {
  id: number;
  styleId: number;
  backgroundId: number;
  colorRange: number;
  createdAt: number;
  updatedAt: number;
  textChunks: ITextChunk[];
  author: IUser;
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

export interface IWordLetter {
  isSelected: boolean;
  ch: string;
}

export interface IPagination<T> {
  count: number;
  hasMore: boolean;
  items: T[];
}
