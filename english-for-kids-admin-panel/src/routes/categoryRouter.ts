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

categoryRouter.delete('/:id', async (req, res) => {
  try {
    await CategoryModel.findByIdAndRemove(req.params.id);
    res.sendStatus(204);
  } catch {
    res.status(404).send({ error: 'The category does not exist' });
  }
});

categoryRouter.patch('/:id', async (req, res) => {
  const category = {
    category: req.body.category,
  };

  try {
    const newCategory = await CategoryModel.findByIdAndUpdate(req.params.id, category, { new: true });
    res.send(newCategory);
  } catch {
    res.status(404).send({ error: 'The category does not exist' });
  }
});
