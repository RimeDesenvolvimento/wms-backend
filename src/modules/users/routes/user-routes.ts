import { Router } from 'express';
import { UserController } from '../controllers/user-controller';
import { UserService } from '../services/user-service';
import { UserRepository } from '../repositories/user-repository';

const router = Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.get('/', (req, res) => userController.findAll(req, res));
router.get('/:id', (req, res) => userController.findById(req, res));
router.put('/:id', (req, res) => userController.update(req, res));
router.delete('/:id', (req, res) => userController.delete(req, res));

export { router as userRoutes }; 