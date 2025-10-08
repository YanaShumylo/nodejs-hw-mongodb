import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registerUserSchema, loginUserSchema } from '../validation/auth.js';
import { registerUserController, loginUserController, logoutUserController, refreshUserSessionController } from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { requestResetEmailSchema } from '../validation/auth.js';
import { requestResetEmailController } from '../controllers/auth.js';

const router = express.Router();

router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),);

router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),);

router.post(
  '/logout',
  ctrlWrapper(logoutUserController));

router.post(
  '/refresh',
  ctrlWrapper(refreshUserSessionController));

router.post(
  '/send-reset-email',
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController),
);

export default router;

