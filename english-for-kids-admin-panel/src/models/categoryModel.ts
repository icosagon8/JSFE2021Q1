import { Schema, model } from 'mongoose';

const wordShema = new Schema(
  {
    word: String,
    translation: String,
    image: String,
    audioSrc: String,
  },
  { versionKey: false }
);

const categorySchema = new Schema(
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

export const CategoryModel = model('Post', categorySchema);
