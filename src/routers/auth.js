import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  registerController,
  loginController,
  logoutController,
  refreshController,
  requestResetEmailController
} from '../controllers/authController.js';
import { validateBody } from '../middlewares/validateBody.js';
import { registerSchema, loginSchema } from '../validation/auth.js';

import { requestResetEmailSchema } from '../validation/auth.js';



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

authRouter.post(
  '/logout',
  ctrlWrapper(logoutController),
);

authRouter.post(
  '/refresh',
  ctrlWrapper(refreshController),
);

authRouter.post(
  '/request-reset-email',
  jsonParser,
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController),
);


export default authRouter;
