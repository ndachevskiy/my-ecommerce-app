import jwt from 'jsonwebtoken';
import { StatelessAuthService } from 'src/services/auth/types';

export const createJWTAuthService = (): StatelessAuthService => {
  return {
    generateAuth: (data, options) => {
      return jwt.sign({ sub: data.subject }, options.secret, { expiresIn: options.expiresIn });
    },
    verifyAuth: (token, secret) => {
      try {
        const decoded = jwt.verify(token, secret) as jwt.JwtPayload;
        if (decoded) {
          return { subject: decoded.sub };
        } else {
          return { error: "Invalid or expired token"}
        }
      } catch (error) {
        return { error: error.message }
      }
    }
  };
};


