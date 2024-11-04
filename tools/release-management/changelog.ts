import { releaseChangelog } from 'nx/release';
import { IReleaseArgs } from './interfaces/iRelease';

// Function to run the nx release changelog command
export async function runReleaseChangelog(
  versionData: any, // should be object
  apps: string[],
  args: IReleaseArgs
) {
  try {
    if (!versionData) {
      throw new Error('No version specified');
    }
    console.log(`First Release: ${args.first_release}`);

    for (const app of apps) {
      console.log(`Running changelog for ${app} with version ${versionData}`);

      if (!versionData[app]) throw new Error('No version specified');

      let version = versionData[app].newVersion;
      if (!version) throw new Error('No version specified');

      const customMessage = `chore(${app}): release ${version}`;
      await releaseChangelog({
        version: version,
        projects: [app],
        gitCommitMessage: customMessage,
        verbose: true,
        firstRelease: args.first_release,
        gitTag: true,
        gitCommit: true,
        dryRun: args.dryRun,
      });
    }
  } catch (error) {
    console.error(`Error running changelog for ${apps}:`, error);
  }
}
