import 'dotenv/config';

import { Configuration, OpenAIApi } from "openai";

const { API_VERSION, API_KEY, DEPLOYMENT, HOSTNAME, MODEL } = process.env;

const configuration = new Configuration({
    apiKey: API_KEY,
    basePath: `https://${HOSTNAME}.openai.azure.com/openai/deployments/${DEPLOYMENT}`,
    baseOptions: {
        headers: { 'api-key': API_KEY },
        params: {
            'api-version': API_VERSION
        }
    }
});

const askGPT = async (messages) => {
    try {
        const openai = new OpenAIApi(configuration);

        const response = await openai.createChatCompletion({
            model: MODEL,
            messages,
            temperature: 0,
        });

        const content = response?.data?.choices?.[0]?.message?.content;

        return content;

    } catch (e) {
        console.error(e);

    }
};

export { askGPT };