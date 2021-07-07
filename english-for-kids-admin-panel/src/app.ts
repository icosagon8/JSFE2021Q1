import express from 'express';
import mongoose from 'mongoose';
import { categoryRouter } from './routes/categoryRouter';

const PORT = 3000;

async function start() {
  try {
    await mongoose.connect(
      'mongodb+srv://icosagon8:rssefk@cluster0.lnrdj.mongodb.net/efk?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    const app = express();
    app.use(express.json());
    app.use('/api/categories', categoryRouter);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}

start();
