import minimist from 'minimist';
import * as git from './helper/git';
import * as extractor from './helper/extractor';
import { bumpVersion } from './version';
import { runReleaseChangelog } from './changelog';
import { IReleaseArgs } from './interfaces/iRelease';
import { stringify } from 'querystring';
import { argv } from 'process';
import { runReleasePublish } from './publish';

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

    let apps = res.app;
    if (args.apps && args.apps != '') {
      apps = args.apps;
    }

    await bumpVersion(res.type, apps, args);

    // TODO: handle for multiple apps. How to manage the version
    const version = extractor.getAppCurrentVersion(apps); // get new version resulted from nx release version
    await runReleaseChangelog(version, apps, args);

    await runReleasePublish(apps, args);
  } catch (error) {
    console.error(error);
  }
}

function processArgs(): IReleaseArgs {
  const argv = minimist(process.argv.slice(2));
  console.log(argv);

  const args: IReleaseArgs = {
    first_release: argv['first-release'],
    apps: argv['apps'],
    dryRun: true, // default for safety
  };

  if (argv['exec']) {
    console.log('Release running not on dry-run...');
    args.dryRun = false;
  }

  return args;
}

const args = processArgs();

// Run the release process
runRelease(args)
  .catch((err) => console.error(err))
  .then(() => process.exit(0));