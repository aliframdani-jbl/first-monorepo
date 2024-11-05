import { releaseChangelog } from 'nx/release';
export interface IReleaseArgs {
  first_release?: boolean;
  apps: string; // comma separated list of apps
  dryRun: boolean;
}

export interface IBumpVersion {
  workspaceVersion: string | null | undefined;
  projectsVersionData: any;
}

export interface IReleaseChangelog {
  releaseVersion: any;
  contents: string;
}
