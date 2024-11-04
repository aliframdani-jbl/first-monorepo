import * as extractor from './helper/extractor';
import { releaseVersion } from 'nx/release';
import { IBumpVersion, IReleaseArgs } from './interfaces/iRelease';

// Function to run the appropriate version bump command
export async function runBumpVersion(
  commitType: string,
  apps: string[],
  args: IReleaseArgs
): Promise<IBumpVersion> {
  if (apps.length == 0) {
    throw new Error('No app specified');
  }

  console.log(`Detected commit type: ${commitType}`);
  console.log(`Bumping version for apps: ${apps}`);

  const specifier = extractor.getBumpSpecifier(commitType);
  if (specifier == '') {
    throw new Error(`No version bump required for ${commitType}.`);
  }

  const { workspaceVersion, projectsVersionData } = await releaseVersion({
    specifier: specifier,
    projects: apps,
    verbose: true,
    firstRelease: args.first_release,
    gitCommit: true,
    dryRun: args.dryRun,
  });

  console.log('ANU');
  console.log(projectsVersionData);

  return {
    workspaceVersion: workspaceVersion,
    projectsVersionData: projectsVersionData,
  };
}
