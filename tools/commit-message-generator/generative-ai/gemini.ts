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

export const generateCommitMsg = async (gitDiff: string): Promise<string> => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not set');
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    // let gitDiff = await fs.readFile('diff.txt', 'utf-8');
    const prompt = FULL_COMMIT_MSG_PROMPT + gitDiff;
    const result = await model.generateContent(prompt);
    // console.log(result.response.text());
    return result.response.text();
  } catch (error) {
    console.error('Error reading the prompt or generating content:', error);
    return '';
  }
};

export const generateCommitMsgWithContext = async (
  gitDiff: string,
  ctx: string
): Promise<string> => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not set');
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    // let gitDiff = await fs.readFile('diff.txt', 'utf-8');
    const prompt = FULL_COMMIT_MSG_PROMPT + withContextPrompt(ctx) + gitDiff;
    const result = await model.generateContent(prompt);
    // console.log(result.response.text());
    return result.response.text();
  } catch (error) {
    console.error('Error reading the prompt or generating content:', error);
    return '';
  }
};

export const generateSubject = async (gitDiff: string): Promise<string> => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not set');
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    // let gitDiff = await fs.readFile('diff.txt', 'utf-8');
    const prompt = SUBJECT_ONLY_PROMPT + gitDiff;
    const result = await model.generateContent(prompt);
    // console.log(result.response.text());
    return result.response.text();
  } catch (error) {
    console.error('Error reading the prompt or generating content:', error);
    return '';
  }
};
