// import { execSync } from 'child_process';

// // Function to get the current version
// function getCurrentVersion(project: string): string {
//   const version = execSync(
//     `npx nx print-affected --type=lib --select=version ${project}`
//   )
//     .toString()
//     .trim();
//   return version;
// }

// // Function to calculate the new version based on the current version and type of bump
// function calculatePrevVersion(
//   currentVersion: string,
//   bumpType: string
// ): string {
//   const [major, minor, patch] = currentVersion.split('.').map(Number);

//   switch (bumpType) {
//     case 'major':
//       return `${major - 1}.0.0`;
//     case 'minor':
//       return `${major}.${minor - 1}.0`;
//     case 'patch':
//       return `${major}.${minor}.${patch - 1}`;
//     default:
//       throw new Error('Invalid bump type');
//   }
// }

// function undoVersion(bumpType: string, projects: string) {
//   const currentVersion = getCurrentVersion(projects);
//   let prevVersion;

//   switch (bumpType) {
//     case 'major':
//       prevVersion = calculatePrevVersion(currentVersion, 'minor');
//       console.log(`Reverting to previous Major version: ${prevVersion}`);
//       execSync(`npx nx release version ${prevVersion} ${projects}`, {
//         stdio: 'inherit',
//       });
//       break;
//     case 'minor':
//       prevVersion = calculatePrevVersion(currentVersion, 'patch');
//       console.log(`Reverting to previous Minor version: ${prevVersion}`);
//       execSync(
//         `npx nx release version minor --version ${prevVersion} ${projects}`,
//         { stdio: 'inherit' }
//       );
//       break;
//     case 'patch':
//       prevVersion = currentVersion; // Patch doesn't have a previous state.
//       console.log(`Reverting to previous Patch version: ${prevVersion}`);
//       execSync(
//         `npx nx release version patch --version ${prevVersion} ${projects}`,
//         { stdio: 'inherit' }
//       );
//       break;
//     default:
//       console.log(`No undo action for bump type: ${bumpType}`);
//       break;
//   }
// }

// const projects = process.argv[2];

// undoVersion(, projects).catch((err) => console.error(err));
