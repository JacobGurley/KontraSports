import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';
import sendMail from './sendMail';
require('dotenv').config();

const app = express();
app.use(json());
app.use(cors());

app.post('/send', async (req, res) => {
  try {
    await sendMail(req.body);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending email');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));