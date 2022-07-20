import UserModel from '../model/user.model';
import UserLoginDTO from '../dto/user.dto';
import { JwtService } from '@midwayjs/jwt';
import { Body, Controller, Inject, Post } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import UserEntity from '../entity/user.entity';
import { Repository } from 'typeorm';
import { Context } from '@midwayjs/koa';

@Controller('/user')
export class UserController {
  @Inject()
  userModel: UserModel;

  @Inject()
  ctx: Context;

  @InjectEntityModel(UserEntity)
  userRepo: Repository<UserEntity>;

  @Inject()
  jwt: JwtService;

  @Post('/login')
  async login(@Body() user: UserLoginDTO) {
    const { username, password } = user;
    await this.userRepo.insert({
      username: 'jack',
      password: 'redballoon',
    });
    try {
      const userResult = await this.userModel.getUserByUsernameAndPassword(
        username,
        password
      );
      console.log(userResult);
      if (userResult === null) {
        console.log(userResult);
        this.ctx.status = 400;
        return {
          code: 400,
          result: 'error',
          message: '账号或密码不正确',
          data: null,
        };
      }
      console.log('asdfasdf');
      return {
        code: 200,
        result: 'success',
        message: '登陆成功',
        data: {
          token: await this.jwt.sign({
            username: userResult.username,
            time: new Date(),
          }),
        },
      };
    } catch (e) {
      return {
        code: 500,
        result: 'error',
      };
    }
  }
}
