import { Schema, model } from 'mongoose';

export interface Word {
  word: string;
  translation: string;
  image: string;
  audioSrc: string;
  categoryId: string;
}

export const wordShema = new Schema<Word>(
  {
    word: String,
    translation: String,
    image: String,
    audioSrc: String,
    categoryId: Schema.Types.ObjectId,
  },
  { versionKey: false }
);

export const WordModel = model<Word>('Words', wordShema);
