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

categorySchema.set('toJSON', {
  virtuals: true,
  transform: (doc: any, converted: any) => {
    delete converted._id;
  },
});

export const CategoryModel = model<Category>('Categories', categorySchema);
