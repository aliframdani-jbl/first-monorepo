import { ICommitGenerator } from '../interfaces/commit-generator';
import gemini from './gemini';

export class GenerativeAI {
  commitGenerator: ICommitGenerator;
  constructor(platform: string) {
    if (platform === 'gemini') {
      this.commitGenerator = gemini;
    }
  }

  async generateCommitMessage(gitDiff: string): Promise<string> {
    return await this.commitGenerator.generateCommitMessage(gitDiff);
  }

  async generateCommitMessageWithContext(
    gitDiff: string,
    context: string
  ): Promise<string> {
    return await this.commitGenerator.generateCommitMessageWithContext(
      gitDiff,
      context
    );
  }

  async generateSubject(gitDiff: string): Promise<string> {
    return await this.commitGenerator.generateSubject(gitDiff);
  }
}
