import simpleGit from 'simple-git';

const git = simpleGit();

export async function getAllTags(): Promise<string[]> {
  const tags = await git.tags();
  return tags.all;
}

// Function to fetch the last tag version for each app
export async function fetchLastTagVersions(apps: string[]) {
  const allTags = await getAllTags();
  const appTags: { [key: string]: string } = {};

  apps.forEach((app) => {
    // Filter tags for the specific app
    const filteredTags = allTags.filter((tag) => tag.startsWith(`${app}@`));

    // Get the last tag for the app (if exists)
    if (filteredTags.length > 0) {
      appTags[app] = filteredTags[filteredTags.length - 1]; // Get the last tag
    } else {
      appTags[app] = 'No tags found'; // Handle case where no tags exist
    }
  });

  return appTags;
}

export async function getLastCommitMessage(): Promise<string | undefined> {
  const log = await git.log({ n: 1 });
  return log.latest?.message.trim();
}

// Function to get the last tag for a given app
export function getLastTagForApp(
  app: string,
  allTags: string[]
): string | null {
  // Filter tags for the app (assuming tags follow the pattern app@version)
  const filteredTags = allTags.filter((tag) => tag.startsWith(`${app}@`));

  // Return the latest tag if available
  if (filteredTags.length > 0) {
    return filteredTags[filteredTags.length - 1];
  } else {
    console.log(`No tags found for ${app}`);
    return null;
  }
}
