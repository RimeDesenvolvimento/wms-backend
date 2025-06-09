import { Router } from 'express';
import { AuthController } from '../controllers/auth-controller';
import { AuthService } from '../services/auth-service';

const router = Router();
const authService = new AuthService();
const authController = new AuthController(authService);

router.post('/login', (req, res) => authController.login(req, res));
router.post('/register', (req, res) => authController.register(req, res));
router.put('/refresh', (req, res) => authController.refreshToken(req, res));

export { router as authRoutes }; 