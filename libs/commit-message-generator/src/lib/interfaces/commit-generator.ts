export interface ICommitGenerator {
  generateCommitMessage(gitDiff: string): Promise<string>;
  generateCommitMessageWithContext(
    gitDiff: string,
    context: string
  ): Promise<string>;
  generateSubject(gitDiff: string): Promise<string>;
}
