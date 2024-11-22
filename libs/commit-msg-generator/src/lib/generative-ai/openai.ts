import OpenAI from 'openai';
import path from 'path';
import { config } from 'dotenv';

// const res = config({ path: path.resolve(__dirname, '../../.env') });
// res.error ? console.log(res.error) : console.log(res.parsed);

config({ path: path.resolve(__dirname, '../../.env') });

const openai = new OpenAI();

(async () => {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      {
        role: 'user',
        content: 'Write a haiku about recursion in programming.',
      },
    ],
  });

  console.log(completion.choices[0].message);
})();
