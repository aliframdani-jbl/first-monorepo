import minimist from 'minimist';
import * as git from './helper/git';
import * as extractor from './helper/extractor';
import { bumpVersion } from './version';
import { runReleaseChangelog } from './changelog';
import { IReleaseArgs } from './interfaces/iRelease';

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
    const res = extractor.getCommitTypeAndApp(commitMessage);
    if (res.type == '') {
      throw new Error('No valid release trigger found.');
    }

    await bumpVersion(res.type, res.app, args);

    const version = extractor.getAppCurrentVersion(res.app); // get new version resulted from nx release version
    await runReleaseChangelog(version, res.app, args);
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
  };

  return args;
}

const args = processArgs();

// Run the release process
runRelease(args)
  .catch((err) => console.error(err))
  .then(() => process.exit(0));
