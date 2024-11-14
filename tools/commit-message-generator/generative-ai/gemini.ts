import { GoogleGenerativeAI } from '@google/generative-ai';
import { promises as fs } from 'fs';
import path from 'path';
import { config } from 'dotenv';
import {
  FULL_COMMIT_MSG_PROMPT,
  SUBJECT_ONLY_PROMPT,
  withContextPrompt,
} from '../prompt';

const res = config({ path: path.resolve(__dirname, '../../../.env') });
res.error ? console.log(res.error) : '';

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error('GEMINI_API_KEY is not set');
}

const genAI = new GoogleGenerativeAI(apiKey);

const generate = async (gitDiff: string, prompt: string): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Error reading the prompt or generating content:', error);
    return '';
  }
};

const generateCommitMessage = async (gitDiff: string): Promise<string> => {
  try {
    const prompt = FULL_COMMIT_MSG_PROMPT + gitDiff;
    return generate(gitDiff, prompt);
  } catch (error) {
    console.error('Error reading the prompt or generating content:', error);
    return '';
  }
};

const generateCommitMessageWithContext = async (
  gitDiff: string,
  ctx: string
): Promise<string> => {
  try {
    const prompt = FULL_COMMIT_MSG_PROMPT + withContextPrompt(ctx) + gitDiff;
    return generate(gitDiff, prompt);
  } catch (error) {
    console.error('Error reading the prompt or generating content:', error);
    return '';
  }
};

const generateSubject = async (gitDiff: string): Promise<string> => {
  try {
    const prompt = SUBJECT_ONLY_PROMPT + gitDiff;
    return generate(gitDiff, prompt);
  } catch (error) {
    console.error('Error reading the prompt or generating content:', error);
    return '';
  }
};

export default {
  generateCommitMessage,
  generateSubject,
  generateCommitMessageWithContext,
};
