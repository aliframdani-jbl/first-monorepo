#! /usr/bin/env node

import { runCommitGenerator } from '../lib';
import { Command } from 'commander';
import figlet from 'figlet';
const program = new Command();

program
  .version('1.0.0')
  .description(
    'An AI-powered commit generator tools. Provided for manusia-manusia mager.'
  )
  .name('mager-commit')
  .option(
    '-d, --default',
    'Run a commit generator with every params decided by the Generative AI.'
  )
  .option(
    '-c, --custom',
    'Customize the commit message generator that will be generated by Generative AI.'
  )
  .option('-h, --help', 'Show help.')
  .parse(process.argv);

const options = program.opts();

if (!process.argv.slice(2).length || options['help']) {
  console.log(figlet.textSync('Mager Commit'));
  program.outputHelp();
} else {
  runCommitGenerator(options);
}
