export interface IReleaseArgs {
  first_release?: boolean;
  apps: string; // comma separated list of apps
  dryRun: boolean;
}

export interface IBumpVersion {
  workspaceVersion: string | null | undefined;
  projectsVersionData: any;
}
