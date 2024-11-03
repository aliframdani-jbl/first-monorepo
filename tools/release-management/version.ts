import * as extractor from './helper/extractor';
import { releaseVersion } from 'nx/release';
import { IReleaseArgs } from './interfaces/iRelease';

// Function to run the appropriate version bump command
export async function bumpVersion(
  commitType: string,
  app: string,
  args: IReleaseArgs
) {
  if (app == '') {
    throw new Error('No app specified');
  }

  console.log(`Detected commit type: ${commitType}`);
  console.log(`Bumping version for app: ${app}`);

  const specifier = extractor.getBumpSpecifier(commitType);
  if (specifier == '') {
    throw new Error(`No version bump required for ${commitType}.`);
  }

  await releaseVersion({
    specifier: specifier,
    projects: [app],
    verbose: true,
    firstRelease: args.first_release,
    gitCommit: true,
    dryRun: args.dryRun,
  });
}
