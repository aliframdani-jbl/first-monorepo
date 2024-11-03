import * as c from '../constants/constants';
import fs from 'fs';
import path from 'path';

const MAJOR = 'major';
const MINOR = 'minor';
const PATCH = 'patch';

export function getCommitTypeAndApps(commitMessage: string): {
  type: string;
  app: string;
} {
  let match: RegExpMatchArray | null;
  let app: string = '';

  if ((match = commitMessage.match(c.majorPattern))) {
    if (match[1]) app = match[1];
    return { type: c.FEATMAJOR, app };
  } else if ((match = commitMessage.match(c.minorPattern))) {
    if (match[1]) app = match[1];
    return { type: c.FEAT, app };
  } else if ((match = commitMessage.match(c.patchPattern))) {
    if (match[1]) app = match[1];
    return { type: c.FIX, app };
  } else if ((match = commitMessage.match(c.refactorPattern))) {
    if (match[1]) app = match[1];
    return { type: c.REFACTOR, app };
  } else if ((match = commitMessage.match(c.chorePattern))) {
    if (match[1]) app = match[1];
    return { type: c.CHORE, app };
  } else if ((match = commitMessage.match(c.docsPattern))) {
    if (match[1]) app = match[1];
    return { type: c.DOCS, app };
  } else if ((match = commitMessage.match(c.stylePattern))) {
    if (match[1]) app = match[1];
    return { type: c.STYLE, app };
  } else if ((match = commitMessage.match(c.testPattern))) {
    if (match[1]) app = match[1];
    return { type: c.TEST, app };
  } else {
    return { type: '', app: '' };
  }
}

export function getCommitType(commitMessage: string): string {
  if (c.majorPattern.test(commitMessage)) {
    return c.FEATMAJOR;
  } else if (c.minorPattern.test(commitMessage)) {
    return c.FEAT;
  } else if (c.patchPattern.test(commitMessage)) {
    return c.FIX;
  } else if (c.refactorPattern.test(commitMessage)) {
    return c.REFACTOR;
  } else if (c.chorePattern.test(commitMessage)) {
    return c.CHORE;
  } else if (c.docsPattern.test(commitMessage)) {
    return c.DOCS;
  } else if (c.stylePattern.test(commitMessage)) {
    return c.STYLE;
  } else if (c.testPattern.test(commitMessage)) {
    return c.TEST;
  } else {
    return '';
  }
}

export function getAppCurrentVersion(app: string): string {
  try {
    const packageJsonPath = path.resolve(`apps/${app}/package.json`);
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    return packageJson.version;
  } catch (error) {
    console.error(`Error reading package.json for app named: ${app}\n\n`);
    console.error(error);
    return '';
  }
}

export function getBumpSpecifier(commitType: string): string {
  switch (commitType) {
    case c.FEATMAJOR:
      return MAJOR;
    case c.FEAT:
      return MINOR;
    case c.FIX:
      return PATCH;
    case c.REFACTOR:
      return PATCH;
    case c.DOCS:
      return PATCH;
    case c.STYLE:
      return PATCH;
    case c.CHORE:
      console.log(`No version bump required for ${commitType}.`);
      break;
    case c.TEST:
      console.log(`No version bump required for ${commitType}.`);
      break;
    default:
      console.log(`Unknown commit type: ${commitType}`);
      break;
  }
  return '';
}
