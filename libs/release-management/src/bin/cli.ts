#! /usr/bin/env node

import { runRelease } from '../lib';
import { Command } from 'commander';
import figlet from 'figlet';
const program = new Command();

program
  .version('1.0.0')
  .description(
    'Release management for NX monorepo using predefined standard. Will run on dry-run by default.'
  )
  .option('-fr, --first-release', 'First release version.')
  .option('-a, --apps', 'Insert apps to be released.')
  .option('-p, --publish', 'Disable dry run.')
  .option('-h, --help', 'Show help.')
  .parse(process.argv);

const options = program.opts();

if (options['help']) {
  console.log(figlet.textSync('Releasx'));
  program.outputHelp();
} else {
  runRelease({
    apps: options['apps'],
    dryRun: !options['publish'],
    first_release: options['first-release'],
  });
}
