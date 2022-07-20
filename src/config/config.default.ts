import { MidwayConfig } from '@midwayjs/core';
import UserEntity from '../entity/user.entity';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1658133337440_1925',
  koa: {
    port: 7001,
  },
  orm: {
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [UserEntity],
    synchronize: true,
    logging: false,
  },
} as MidwayConfig;
