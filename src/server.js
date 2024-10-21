import express from "express";
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';
import { env } from './utils/env.js';
import { Contact } from './models/contacts.js';

dotenv.config();

const PORT = Number(env('PORT', '3000'));

export const startServer = () => {

const app = express();

app.use(cors());

app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

app.get('/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find();

    res.json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/contacts/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const contacts = await Contact.findById(id);

    if (contacts === null) {
      return res.status(404).send('Contact not found');
    }

    res.json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

app.use((err, req, res, next) => {
   res.status(500).json({
    message: 'Something went wrong',
    error: err.message,
  });
 });



app.listen(PORT , ()=>{
    console.log(`Server is running on port ${PORT}`);

});
};
