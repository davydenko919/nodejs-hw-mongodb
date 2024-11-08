import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registerController, loginController } from '../controllers/authController.js';
import { validateBody } from '../middlewares/validateBody.js';
import { registerSchema, loginSchema } from '../validation/auth.js';

const authRouter = express.Router();
const jsonParser = express.json();

authRouter.post(
  '/register',
  jsonParser,
  validateBody(registerSchema),
  ctrlWrapper(registerController),
);

authRouter.post(
    '/login',
    jsonParser,
    validateBody(loginSchema),
    ctrlWrapper(loginController),
  );

export default authRouter;
