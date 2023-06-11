import 'dotenv/config';

import express, { Router } from 'express';
import { loadDocumentQA, askGPT } from './utils.js';

const app = express();
const router = Router();
app.use(express.json());

console.log('Loading the document...');

const QA = await loadDocumentQA();

router.post('/ask', async (req, res, next) => {
    try {
        let question = req.body.question;
        let { text: originalAnswer } = await QA.call({ query: question });
        originalAnswer = originalAnswer.trim();
        const {text: gptResponse} = await askGPT(question, originalAnswer)
        console.log("GPT Response:", gptResponse)
        res.json(JSON.parse(gptResponse));
    } catch (error) {
        res.json({ "response": "An agent will answer soon.", "language": "Unknown" })
        next(error);
    }

});

app.use('/api', router);

app.listen(3000, () => console.log('Server running on port 3000'));