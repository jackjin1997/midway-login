import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework } from '@midwayjs/koa';
import Application = require("koa");

describe('test/controller/home.test.ts', () => {

  let app: Application;

  beforeAll(async () => {
    // 只创建一次 app，可以复用
    try {
      // 由于Jest在BeforeAll阶段的error会忽略，所以需要包一层catch
      // refs: https://github.com/facebook/jest/issues/8688
      app = await createApp<Framework>();
    } catch(err) {
      console.error('test beforeAll error', err);
      throw err;
    }
  });

  afterAll(async () => {
    // close app
    // @ts-ignore
    await close(app);
  });

  it('should success POST /user', async () => {
    // make request
    // @ts-ignore
    const result = await createHttpRequest(app)
      .post('/user/login')
      .send({
        username: "jack",
        password: "redballoon"
      })
      .set('x-timeout', '1000');

    // use expect by jest
    expect(result.status).toBe(200);
    // expect(result.message).toBe('登陆成功');
  });

  it('should failed POST /user', async () => {
    // make request
    // @ts-ignore
    const result = await createHttpRequest(app)
      .post('/user/login')
      .send({
        username: "asdf",
        password: "rubbish"
      })
      .set('x-timeout', '1000');

    // use expect by jest
    expect(result.status).toBe(400);
  });

});
