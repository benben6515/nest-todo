import { randomBytes, pbkdf2Sync } from 'crypto';

export class CommonUtility {
  public static encryptBySalt(
    input: string,
    salt = randomBytes(16).toString('hex'),
  ) {
    const hash = pbkdf2Sync(input, salt, 1000, 64, 'sha256').toString('hex');
    return { hash, salt };
  }
}
