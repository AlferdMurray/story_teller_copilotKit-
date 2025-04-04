import express from 'express';
import {
    CopilotRuntime,
    OpenAIAdapter,
    copilotKitEndpoint,
    copilotRuntimeNodeHttpEndpoint,
} from '@copilotkit/runtime';
import OpenAI from 'openai';

// import { OpenAI } from 'langchain/llms/openai';

const app = express();

const openai = new OpenAI({ apiKey: "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" })

const serviceAdapter = new OpenAIAdapter({ openai: openai, modelName: "gpt-3.5-turbo" });

app.use('/copilotkit', (req, res, next) => {
    (async () => {
        const remoteEndpoint = copilotKitEndpoint({
            url: "http://localhost:8000/copilotkit"
        })

        const runtime = new CopilotRuntime({
            remoteEndpoints: [remoteEndpoint]
        })
        const handler = copilotRuntimeNodeHttpEndpoint({
            endpoint: '/copilotkit',
            runtime,
            serviceAdapter,
        });

        return handler(req, res);
    })().catch(next);
});

app.listen(4000, () => {
    console.log('Listening at http://localhost:4000/copilotkit');
});