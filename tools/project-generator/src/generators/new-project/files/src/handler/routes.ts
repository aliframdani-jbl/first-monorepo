import { Router } from 'express';
import { UserHandler } from './user_handler';
export const RegisterUserRoutes = (
  router: Router,
  userHandler: UserHandler
) => {
  router.get('/users/:id', (req, res) => userHandler.findById(req, res));
  router.get('/users', (req, res) => userHandler.findAll(req, res));
  router.post('/users', (req, res) => userHandler.create(req, res));
  router.put('/users/:id', (req, res) => userHandler.update(req, res));
  router.delete('/users/:id', (req, res) => userHandler.delete(req, res));
};
