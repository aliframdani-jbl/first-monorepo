import { releasePublish } from 'nx/release';
import { IReleaseArgs } from './interfaces/iRelease';

export async function runReleasePublish(apps: string, args: IReleaseArgs) {
  try {
    console.log(`Publishing for ${apps}`);

    await releasePublish({
      projects: [apps],
      dryRun: args.dryRun,
      firstRelease: args.first_release,
    });
  } catch (error) {
    console.error(`Error publishing for ${apps}:`, error);
  }
}
