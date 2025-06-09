import { Router } from 'express';
import { AuthController } from '../controllers/auth-controller';
import { AuthService } from '../services/auth-service';
import { UserService } from '@/modules/users/services/user-service';
import { UserRepository } from '@/modules/users/repositories/user-repository';
import { AuthRepository } from '../repositories/auth-repository';

const router = Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const authRepository = new AuthRepository();
const authService = new AuthService(userService, authRepository);
const authController = new AuthController(authService);

router.post('/login', (req, res) => authController.login(req, res));
router.post('/register', (req, res) => authController.register(req, res));
router.put('/refresh', (req, res) => authController.refreshToken(req, res));

export { router as authRoutes }; 