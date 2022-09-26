import { registerAs } from '@nestjs/config';

export default registerAs('secrets', () => {
  const jwt = process.env.JWT_SECRET;

  return { jwt };
});
