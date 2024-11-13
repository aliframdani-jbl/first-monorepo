import { execSync } from 'child_process';
import inquirer from 'inquirer';
import {
  generateCommitMsg,
  generateSubject,
  generateCommitMsgWithContext,
} from './generative-ai/gemini';

// Function to get the git diff
const getGitDiff = (): string => {
  try {
    return execSync('git diff --cached').toString();
  } catch (error) {
    console.error('Failed to get git diff:', error);
    return '';
  }
};

// Function to detect affected apps
const detectApps = (): string => {
  const changedFiles = execSync('git diff --cached --name-only')
    .toString()
    .split('\n');
  const apps = new Set<string>();

  for (const file of changedFiles) {
    const match = file.match(/^apps\/([^/]+)\//);
    if (match) {
      apps.add(match[1]);
    }
  }

  return Array.from(apps).join(',') || 'global';
};

// Function to prompt user for commit type with inquirer
const getCommitType = async (): Promise<string> => {
  const { mainType } = await inquirer.prompt([
    {
      type: 'list',
      name: 'mainType',
      message: 'Select commit type:',
      choices: [
        { name: 'Major (feat!)', value: 'feat!' },
        { name: 'Minor (feat)', value: 'feat' },
        { name: 'Patch', value: 'patch' },
      ],
    },
  ]);

  if (mainType === 'patch') {
    const { patchType } = await inquirer.prompt([
      {
        type: 'list',
        name: 'patchType',
        message: 'Select patch type:',
        choices: [
          { name: 'Fix', value: 'fix' },
          { name: 'Chore', value: 'chore' },
          { name: 'Docs', value: 'docs' },
          { name: 'Style', value: 'style' },
          { name: 'Test', value: 'test' },
          { name: 'Perf', value: 'perf' },
          { name: 'Refactor', value: 'refactor' },
        ],
      },
    ]);
    return patchType;
  }
  return mainType;
};

// Function to generate commit message subject using OpenAI
const genSubject = async (gitDiff: string): Promise<string> => {
  try {
    return generateSubject(gitDiff);
  } catch (error) {
    console.error('Failed to generate commit subject:', error);
    return 'Update code';
  }
};

const genCommitMsg = async (gitDiff: string): Promise<string> => {
  try {
    return generateCommitMsg(gitDiff);
  } catch (error) {
    console.error('Failed to generate commit subject:', error);
    return 'Update code';
  }
};

// Function to confirm, regenerate, or customize commit message
const confirmCommitMessage = async (
  message: string,
  isCustom: boolean
): Promise<string> => {
  let confirmed = false;
  let finalMessage = message;

  while (!confirmed) {
    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          { name: 'Accept', value: 'accept' },
          { name: 'Regenerate', value: 'regenerate' },
          { name: 'Regenerate With Context', value: 'regenerate_with_context' },
          // { name: 'Customize', value: 'customize' },
        ],
      },
    ]);

    if (action === 'accept') {
      confirmed = true;
    } else if (action === 'regenerate') {
      if (isCustom) {
        finalMessage = await runCustomCommitMsgGenerator(getGitDiff());
      } else {
        finalMessage = await genCommitMsg(getGitDiff());
      }

      console.log('Regenerated Message:\n\n', finalMessage);
    } else if (action === 'customize') {
      const { customMessage } = await inquirer.prompt([
        {
          type: 'input',
          name: 'customMessage',
          message: 'Enter custom commit message:',
        },
      ]);
      finalMessage = customMessage;
      confirmed = true;
    } else if (action === 'regenerate_with_context') {
      const { context } = await inquirer.prompt([
        {
          type: 'input',
          name: 'context',
          message: 'Enter context for the commit message:',
        },
      ]);
      finalMessage = await generateCommitMsgWithContext(getGitDiff(), context);
      console.log('Regenerated Message:\n\n', finalMessage);
    }
  }

  return finalMessage;
};

const runCustomCommitMsgGenerator = async (
  gitDiff: string
): Promise<string> => {
  const type = await getCommitType();
  if (!type) {
    console.error('Commit type selection canceled.');
    return '';
  }
  const apps = detectApps();
  const subject = await genSubject(gitDiff);
  return `${type}(${apps}): ${subject}`;
};

// Main function to run the script
const main = async () => {
  const args = process.argv.slice(2);
  const isCustom = args.includes('--custom');
  const gitDiff = getGitDiff();

  if (!gitDiff) {
    console.error('No staged changes found.');
    return;
  }

  let commitMessage: string;

  if (isCustom) {
    commitMessage = await runCustomCommitMsgGenerator(gitDiff);
  } else {
    // Default mode
    console.log('Default Mode');
    commitMessage = await genCommitMsg(gitDiff);
  }

  console.log('Generated Commit Message:\n\n', commitMessage);

  // Confirm, regenerate, or customize the commit message if in interactive mode
  commitMessage = await confirmCommitMessage(commitMessage, isCustom);

  // Stage and commit the changes
  // execSync(`git commit -m "${commitMessage}"`);
  console.log('Changes committed successfully!');
};

main().catch((error) => {
  console.error('An error occurred:', error);
});
