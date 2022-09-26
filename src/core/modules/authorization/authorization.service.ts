import { Inject, Injectable } from '@nestjs/common';

import { Enforcer } from 'casbin';

import { AUTHORIZATION_ENFORCER } from './constants/token.const';
import { AuthorizationAction } from './enums/actions.enums';

@Injectable()
export class AuthorizationService {
  constructor(
    @Inject(AUTHORIZATION_ENFORCER)
    private readonly enforcer: Enforcer,
  ) {}

  public checkPermission(subscribe: string, object: string, action: string) {
    return this.enforcer.enforce(subscribe, object, action);
  }

  public mappingAction(methods: string): AuthorizationAction {
    switch (methods.toUpperCase()) {
      case 'GET':
        return AuthorizationAction.READ;
      case 'POST':
        return AuthorizationAction.CREATE;
      case 'PATCH':
      case 'PUT':
        return AuthorizationAction.UPDATE;
      case 'DELETE':
        return AuthorizationAction.DELETE;
      default:
        return AuthorizationAction.NONE;
    }
  }
}
