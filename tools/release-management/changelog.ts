import { releaseChangelog } from 'nx/release';
import { IReleaseArgs } from './interfaces/iRelease';

// Function to run the nx release changelog command
export async function runReleaseChangelog(
  version: string,
  apps: string,
  args: IReleaseArgs
) {
  try {
    console.log(`Running changelog for ${apps} with version ${version}`);
    console.log(`First Release: ${args.first_release}`);

    const customMessage = `chore(${apps}): release ${version}`;
    await releaseChangelog({
      version: version,
      projects: [apps],
      gitCommitMessage: customMessage,
      verbose: true,
      firstRelease: args.first_release,
      gitTag: true,
      gitCommit: true,
      dryRun: args.dryRun,
    });
  } catch (error) {
    console.error(`Error running changelog for ${apps}:`, error);
  }
}
