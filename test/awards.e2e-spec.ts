import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AwardsController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/producers/interval-awards (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/producers/interval-awards')
      .expect(200);

    const data = response.body;
    expect(data).toHaveProperty('min');
    expect(data).toHaveProperty('max');

    for (const item of [...data.min, ...data.max]) {
      expect(item).toHaveProperty('producer');
      expect(item).toHaveProperty('interval');
      expect(item).toHaveProperty('previousWin');
      expect(item).toHaveProperty('followingWin');
    }
  });

  afterAll(async () => {
    await app.close();
  });
});
