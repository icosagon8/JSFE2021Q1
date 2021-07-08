import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { categoryRouter } from './routes/categoryRouter';
import { wordRouter } from './routes/wordRouter';

const PORT = 3000;

async function start() {
  try {
    await mongoose.connect(
      'mongodb+srv://icosagon8:rssefk@cluster0.lnrdj.mongodb.net/efk?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }
    );

    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use('/api/categories', categoryRouter);
    app.use('/api/words', wordRouter);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}

start();
