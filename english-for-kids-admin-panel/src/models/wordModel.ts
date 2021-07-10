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
    categoryId: String,
  },
  { versionKey: false }
);

wordShema.set('toJSON', {
  virtuals: true,
  transform: (doc: any, converted: any) => {
    delete converted._id;
  },
});

export const WordModel = model<Word>('Words', wordShema);
