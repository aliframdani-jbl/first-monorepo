import { releasePublish } from 'nx/release';
import { IReleaseArgs, IReleaseChangelog } from './interfaces/iRelease';
import { extractVersion } from './helper/extractor';

export async function runReleasePublish(
  apps: string[],
  changelog: IReleaseChangelog[],
  args: IReleaseArgs
) {
  try {
    for (const app of apps) {
      console.log(`Publishing ${app}`);

      if (!changelog[app].releaseVersion?.gitTag) {
        throw new Error(`No git tag found for ${app}`);
      }

      // TODO: TagVersion haven't used yet. Find a way to put the tag on the release. Because there is several errors
      const tagVersion = extractVersion(changelog[app].releaseVersion.gitTag);
      if (tagVersion == null) {
        throw new Error(`No git tag found for ${app}`);
      }

      await releasePublish({
        projects: [app],
        dryRun: args.dryRun,
        firstRelease: args.first_release,
      });
    }
  } catch (error) {
    console.error(`Error publishing for ${apps.join(',')}:`, error);
  }
}
