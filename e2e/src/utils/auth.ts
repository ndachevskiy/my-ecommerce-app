import jwt from 'jsonwebtoken';

export const generateTestToken = (config) => {
  const payload = { sub: 'cafe1e28-0edf-4cb2-a97c-dc58145c7d61' };
  return jwt.sign(payload, config.Auth.SecretKey, { expiresIn: config.Auth.JWTExpiresIn });
};
