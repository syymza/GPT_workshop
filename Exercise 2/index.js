import 'dotenv/config';

import { OpenAI } from "langchain/llms/openai";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RetrievalQAChain } from "langchain/chains";
import express, { Router } from 'express';
import { MemoryVectorStore } from "langchain/vectorstores/memory";


const { API_VERSION, API_KEY, DEPLOYMENT, HOSTNAME, MODEL, EMBEDDINGS } = process.env;
const app = express();
const router = Router();
app.use(express.json());

const loader = new PDFLoader("./TC.pdf");
const pages = await loader.loadAndSplit();

const embeddings = new OpenAIEmbeddings({
    openAIApiKey: API_KEY,
    modelName: EMBEDDINGS,
    azureOpenAIApiVersion: API_VERSION,
    azureOpenAIApiKey: API_KEY,
    azureOpenAIApiInstanceName: HOSTNAME,
    azureOpenAIApiDeploymentName: EMBEDDINGS,
    batchSize:1
});

const vectorStore = await MemoryVectorStore.fromDocuments(pages, embeddings);

const QA = RetrievalQAChain.fromLLM(new OpenAI({
    temperature: 0,
    modelName: MODEL,
    openAIApiKey: API_KEY,
    azureOpenAIApiVersion: API_VERSION,
    azureOpenAIApiKey: API_KEY,
    azureOpenAIApiInstanceName: HOSTNAME,
    azureOpenAIApiDeploymentName: DEPLOYMENT
}), vectorStore.asRetriever(), { returnSourceDocuments: true })


router.post('/ask', async (req, res, next) => {
    try {
        let text = req.body.question;
        let result = await QA.call({ query: text });
        result.text = result.text.trim();
        res.json(result);
    } catch (error) {
        next(error);
    }

});

app.use('/api', router);

app.listen(3000, () => console.log('Server running on port 3000'));