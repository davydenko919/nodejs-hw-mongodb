import createHttpError from 'http-errors';
import { registerUser, loginUser, logoutUser, refreshSession, requestResetToken } from '../services/authService.js';
import { resetPassword } from '../services/authService.js';

export async function registerController(req, res) {
  const payload = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  const registeredUser = await registerUser(payload);

  res.status(201).send({ status: 201, message: 'User registred', data: registeredUser });
}

export async function loginController(req, res) {
  const { email, password } = req.body;
  const session = await loginUser(email, password);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });
 
  res.status(201).send({
    status: 200,
    message: 'Login completed',
    data: {
      accessToken: session.accessToken,
    },
  });
}

export async function logoutController(req, res) {
    const { sessionId } = req.cookies;
    console.log(req);

    if (sessionId == null){
      throw createHttpError(401, "Logout failed: You are not logged in");
    }

    if (typeof sessionId === "string"){
      await logoutUser(sessionId);
    }

    res.clearCookie("refreshToken");
    res.clearCookie("sessionId");

    res.status(204).end();
}

export async function refreshController(req, res) {
  const { sessionId, refreshToken } = req.cookies;

  const session = await refreshSession(sessionId, refreshToken);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.send({
    status: 200,
    message: 'Session refreshed',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const requestResetEmailController = async (req, res) => {
  // console.log(req.body);
  
  await requestResetToken(req.body.email);
  res.json({
    message: 'Reset password email was successfully sent!',
    status: 200,
    data: {},
  });
};

export const resetPasswordController = async (req, res) => {
  await resetPassword(req.body);
  res.json({
    message: 'Password was successfully reset!',
    status: 200,
    data: {},
  });
};