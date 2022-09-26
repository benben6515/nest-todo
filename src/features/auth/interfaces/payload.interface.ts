import { Role } from '../../../common/enums/role.enum';

export interface UserPayload {
  id: string;
  username: string;
  role: Role;
}
