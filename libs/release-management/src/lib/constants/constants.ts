export const FEATMAJOR = 'feat!',
  FEAT = 'feat',
  FIX = 'fix',
  REFACTOR = 'refactor',
  CHORE = 'chore',
  DOCS = 'docs',
  STYLE = 'style',
  TEST = 'test';

// Regex to match the different commit types
export const majorPattern = /^feat!\(?([^)]*)\)?:\s*.*/,
  minorPattern = /^feat\(?([^)]*)\)?:\s*.*/,
  patchPattern = /^fix\(?([^)]*)\)?:\s*.*/,
  refactorPattern = /^refactor\(?([^)]*)\)?:\s*.*/,
  chorePattern = /^chore\(?([^)]*)\)?:\s*.*/,
  docsPattern = /^docs\(?([^)]*)\)?:\s*.*/,
  stylePattern = /^style\(?([^)]*)\)?:\s*.*/,
  testPattern = /^test\(?([^)]*)\)?:\s*.*/;

export const ROOT_SCOPE_COMMIT = 'root';
