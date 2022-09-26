import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CommonUtility } from '../../core/utils/common.utility';
import { UserPayload } from './interfaces/payload.interface';
import { UserService } from '../user';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async validateUser(username: string, password: string) {
    const user = await this.userService.findUser({ username });
    const { hash } = CommonUtility.encryptBySalt(
      password,
      user?.password?.salt,
    );
    if (!user || hash !== user?.password?.hash) return null;
    return user;
  }

  public generateJwt(payload: UserPayload) {
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
