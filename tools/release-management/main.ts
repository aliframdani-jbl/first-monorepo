import minimist from 'minimist';
import * as git from './helper/git';
import * as extractor from './helper/extractor';
import { runBumpVersion } from './version';
import { runReleaseChangelog } from './changelog';
import { IReleaseArgs } from './interfaces/iRelease';
import { runReleasePublish } from './publish';
import { ROOT_SCOPE_COMMIT } from './constants/constants';

// Function to parse the commit message and determine the version bump
async function runRelease(args: IReleaseArgs) {
  try {
    const commitMessage = await git.getLastCommitMessage();
    if (!commitMessage) {
      console.log('No commit message found.');
      return;
    }

    console.log(`Last commit message: "${commitMessage}"`);

    // Extract `app` and commit type, then run the appropriate bump version command
    const res = extractor.getCommitTypeAndApps(commitMessage);
    if (res.type == '') {
      throw new Error('No valid release trigger found.');
    }

    let appsStr = res.app;
    if (args.apps && args.apps != '') {
      appsStr = args.apps;
    }
    const apps = appsStr.split(',');

    if (apps.length == 1 && apps[0] == ROOT_SCOPE_COMMIT) {
      console.log(
        'Root commit scope, not applying version bump and publish package.'
      );
      return;
    }

    const bumpVersion = await runBumpVersion(res.type, apps, args);

    const changelog = await runReleaseChangelog(
      bumpVersion.projectsVersionData,
      apps,
      args
    );

    await runReleasePublish(apps, changelog, args);
  } catch (error) {
    console.error(error);
  }
}

function processArgs(): IReleaseArgs {
  const argv = minimist(process.argv.slice(2));

  const args: IReleaseArgs = {
    first_release: argv['first-release'],
    apps: argv['apps'],
    dryRun: true, // default for safety
  };

  if (argv['exec']) {
    args.dryRun = false;
  } else {
    console.log('[DEFAULT] Automatically running release on dry-run...');
  }

  return args;
}

const args = processArgs();

// Run the release process
runRelease(args)
  .catch((err) => console.error(err))
  .then(() => process.exit(0));
