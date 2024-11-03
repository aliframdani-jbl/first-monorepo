import express from 'express';
import path from 'path';
import { PostgreSQL } from './database/postgres';
import { config } from 'dotenv';
import { RegisterUserRoutes } from './handler/routes';
import { UserHandler } from './handler/user_handler';
import { UserRepository } from './repository/user_repository';
import { UserUsecase } from './usecase/user_usecase';

(async () => {
  try {
    console.log(__dirname);
    const res = config({ path: path.resolve(__dirname, '.env') });
    res.error ? console.log(res.error) : console.log(res.parsed);

    console.log(process.env.DB_HOST);

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

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1); // bertambah
  }
})();

// 14
