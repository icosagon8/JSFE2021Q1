import { Router } from 'express';
import { CategoryModel } from '../models/categoryModel';

export const categoryRouter = Router();

categoryRouter.get('/', async (req, res) => {
  const categories = await CategoryModel.find();
  res.send(categories);
});

categoryRouter.get('/:id', async (req, res) => {
  try {
    const category = await CategoryModel.findOne({ _id: req.params.id });
    res.send(category);
  } catch {
    res.sendStatus(404);
  }
});

categoryRouter.post('/', async (req, res) => {
  const category = new CategoryModel({
    category: req.body.category,
    image: req.body.image,
    words: req.body.words,
  });
  await category.save();
  res.send(category);
});
