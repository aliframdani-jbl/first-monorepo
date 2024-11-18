const SUBJECT_PROMPT = `
Forget the previous context.

Make me a git commit message from git diff provided below. Make sure put context of what being changed as clear as possible, 
specific, descriptive, and dont put file name on it. Don't generate commit message that are too general and not descriptive
like "change code to work", etc. Never put another prefix with ":". This the example of good commit message:

'add login feature in commerce.'

For subject, don't do it like this: 'feat: add login feature in commerce.'. Pure subject text. And use all lowercase.

Only generate 1 commit message. And only generate commit message without any additional text
`;

export const FULL_COMMIT_MSG_PROMPT = `
Make me git commit message with this format:

<type>(<apps>): <subject>

How the ai should work:
- apps detected from where files changed. Can be seen on directory apps/<here>/*. <here> is the app name. If there are multiple apps, append with ",". Apps is not filename
- For the type, chose between: 
  - feat!: breaking change, major 
  - feat: minor change, add new feature, etc 
  - fix: patch changes, fix some issue or bugs 
  - refactor: improve the code to be better
  - chore: change version bump, gitignore, env, settings, dependencies etc 
  - docs: adding docs like swagger, or code comments etc 
  - style: adding style 
  - test: add unit test or performance test 
  - perf: add performance related improvement 
- For the subject, ${SUBJECT_PROMPT}
`;

export const SUBJECT_ONLY_PROMPT = `
${SUBJECT_PROMPT}
`;

export const withContextPrompt = (context: string) => {
  return `
  ${SUBJECT_PROMPT} 

  with this context: ${context}

`;
};
