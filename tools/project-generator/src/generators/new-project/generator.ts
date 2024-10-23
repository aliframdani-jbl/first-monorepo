import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  Tree,
} from '@nx/devkit';
import * as path from 'path';
import { MyGeneratorGeneratorSchema } from './schema';
// import { start } from 'repl';

export async function myGeneratorGenerator(
  tree: Tree,
  options: MyGeneratorGeneratorSchema
) {
  const projectRoot = `apps/${options.name}`;
  addProjectConfiguration(tree, options.name, {
    root: projectRoot,
    projectType: 'application',
    sourceRoot: `${projectRoot}/src`,
    targets: {
      build: {
        executor: '@nx/esbuild:esbuild',
        outputs: ['{options.outputPath}'],
        defaultConfiguration: 'production',
        options: {
          platform: 'node',
          outputPath: `${projectRoot}/dist`,
          format: ['cjs'],
          bundle: false,
          main: `${projectRoot}/src/main.ts`,
          tsConfig: `${projectRoot}/tsconfig.app.json`,
          assets: [
            `${projectRoot}/src/assets`, 
            `${projectRoot}/apps/${options.name}/src/.env`
          ],
          generatePackageJson: true,
          esbuildOptions: {
            sourcemap: true,
            outExtension: { '.js': '.js' },
          },
        },
        configurations: {
          development: {},
          production: {
            generateLockfile: true,
            esbuildOptions: {
              sourcemap: false,
              outExtension: { '.js': '.js' },
            },
          },
        },
      },
      serve: {
        executor: '@nx/js:node',
        defaultConfiguration: 'development',
        dependsOn: ['build'],
        options: {
          buildTarget: `${options.name}:build`,
          runBuildTargetDependencies: false,
        },
        configurations: {
          development: {
            buildTarget: `${options.name}:build:development`,
          },
          production: {
            buildTarget: `${options.name}:build:production`,
          },
        },
      },
      'start-nodemon': {
        dependsOn: ['serve', 'build'],
        command: `nx serve ${options.name}`,
      },
      'docker-build': {
        dependsOn: ['build'],
        command: `docker build -f ${projectRoot}/Dockerfile . -t ${options.name}`,
      },
    },
  });
  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, options);
  await formatFiles(tree);
}

export default myGeneratorGenerator;
