import { Router } from 'express';
import { CategoryModel } from '../models/categoryModel';

export const categoryRouter = Router();

categoryRouter.get('/', async (req, res) => {
  const categories = await CategoryModel.find();
  res.send(categories);
});

categoryRouter.get('/:id', async (req, res) => {
  const category = await CategoryModel.find();
  const { id } = req.params;
  res.send(category[id]);
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
