import express from 'express';
import path from 'path';
import { PostgreSQL } from './database/postgres';
import { config } from 'dotenv';
import { RegisterUserRoutes } from './handler/routes';
import { UserHandler } from './handler/user_handler';
import { UserRepository } from './repository/user_repository';
import { UserUsecase } from './usecase/user_usecase';
import { workspaceRoot } from '@nx/devkit';

(async () => {
  try {
    // const envPath = path.resolve(__dirname, '.env');
    // if (process.env.DOCKER_ENV) {
    // envPath = path.resolve(__dirname, '../../.env');
    // }

    console.log('workspace path: ', workspaceRoot);
    const envPath = path.resolve(workspaceRoot, './apps/myapp/src/.env');
    console.log('envPath: ', envPath);
    const res = config({ path: envPath });
    res.error ? console.log(res.error) : console.log(res.parsed);

    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    const db = new PostgreSQL(); // dynamically changeable
    const err = await db.ping();
    if (err) {
      console.error('Database connection failed:', err);
      process.exit(1);
    }

    const userRepository = new UserRepository(db);
    const userUsecase = new UserUsecase(userRepository);
    const userHandler = new UserHandler(userUsecase);

    // Register routes
    RegisterUserRoutes(app, userHandler);

    console.log('el hitam werrr');
    // ss

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1); // bertambah
  }
})();

// 46
