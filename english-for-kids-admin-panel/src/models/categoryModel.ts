import { Schema, model } from 'mongoose';

interface Word {
  word: string;
  translation: string;
  image: string;
  audioSrc: string;
}

interface Category {
  category: string;
  image: string;
  words: Word[];
}

const wordShema = new Schema<Word>(
  {
    word: String,
    translation: String,
    image: String,
    audioSrc: String,
  },
  { versionKey: false }
);

const categorySchema = new Schema<Category>(
  {
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    words: {
      type: [wordShema],
      required: true,
    },
  },
  { versionKey: false }
);

export const CategoryModel = model<Category>('Post', categorySchema);
