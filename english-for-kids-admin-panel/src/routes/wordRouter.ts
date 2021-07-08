import { Router } from 'express';
import { WordModel } from '../models/wordModel';

export const wordRouter = Router();

wordRouter.get('/', async (req, res) => {
  const words = await WordModel.find();
  res.send(words);
});

wordRouter.get('/:id', async (req, res) => {
  try {
    const word = await WordModel.findOne({ _id: req.params.id });
    res.send(word);
  } catch {
    res.sendStatus(404);
  }
});

wordRouter.post('/', async (req, res) => {
  const word = new WordModel({
    word: req.body.word,
    translation: req.body.translation,
    image: req.body.image,
    audioSrc: req.body.audioSrc,
    categoryId: req.body.categoryId,
  });
  await word.save();
  res.send(word);
});

wordRouter.delete('/:id', async (req, res) => {
  try {
    await WordModel.findByIdAndRemove(req.params.id);
    res.sendStatus(204);
  } catch {
    res.status(404).send({ error: 'The word does not exist' });
  }
});

wordRouter.patch('/:id', async (req, res) => {
  const word = {
    word: req.body.word,
    translation: req.body.translation,
    image: req.body.image,
    audioSrc: req.body.audioSrc,
  };

  try {
    const newWord = await WordModel.findByIdAndUpdate(req.params.id, word, { new: true });
    res.send(newWord);
  } catch {
    res.status(404).send({ error: 'The word does not exist' });
  }
});
