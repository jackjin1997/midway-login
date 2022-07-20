import { Rule } from '@midwayjs/validate';

export default class UserLoginDTO {
  @Rule({
    required: true,
  })
  username: string;

  @Rule({
    required: true,
  })
  password: string;
}
