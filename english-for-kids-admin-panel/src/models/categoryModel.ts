import { Schema, model } from 'mongoose';

interface Category {
  category: string;
  image: string;
}

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
  },
  { versionKey: false }
);

export const CategoryModel = model<Category>('Categories', categorySchema);
