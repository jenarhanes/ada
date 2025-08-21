import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
import { NextResponse } from "next/server";

export const runtime = 'edge';

const openai = createOpenAI({
    baseURL: 'https://models.github.ai/inference',
    apiKey: process.env.GITHUB_TOKEN
});

export async function GET() {
    try {
        const { text } = await generateText({
            model: openai('gpt-4o'),
            system: 'You are a helpful AI assistant named "Ada".',
            prompt: 'Give a brief 2-sentence introduction of yourself.'
        });

        return NextResponse.json({
            message: text
        });
    }
    catch (error) {
        console.log('Error in test routes: ', error);
        return NextResponse.json(
            {
                error: 'An Error occurred'
            },
            {
                status: error.statusCode
            }
        )
    }
}