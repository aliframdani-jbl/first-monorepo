// TODO: CONTINUE LATER

import { execSync } from 'child_process';
import * as git from './helper/git';

async function undoVersion(apps: string) {
  if (apps == '') {
  }
  const appsArray = apps.split(',');
  const lastTags = await git.fetchLastTagVersions(appsArray);

  Object.entries(lastTags).forEach(([app, tag]) => {
    if (tag === 'No tags found') {
      console.log(`No tags found for ${app}`);
      return;
    }

    console.log(`Last Git Tag: ${tag}`);
    console.log(`Reverting to previous last tag version: ${tag}`);
    execSync(`npx nx release version ${tag} ${app}`, {
      stdio: 'inherit',
    });
  });
}

const apps = process.argv[2];

undoVersion(apps).catch((err) => console.error(err));
