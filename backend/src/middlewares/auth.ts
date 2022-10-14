import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import UnauthorizedError from '../errors/unauthorized-error';

// есть файл middlewares/auth.js, в нём мидлвэр для проверки JWT;
interface JwtPayload {
  _id: string
}


const auth = (req: any, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  const token = authorization.replace('Bearer ', '');
  let payload: JwtPayload | null = null;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET ?? 'JWT') as JwtPayload;
    req.user = payload;
    next();
  } catch (e) {
    next(new UnauthorizedError('Необходима авторизация'));
  }
};

export default auth;
