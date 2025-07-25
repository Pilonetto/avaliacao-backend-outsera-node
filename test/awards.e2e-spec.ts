import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AwardsController (e2e)', () => {
  let app: INestApplication;

  // Com base no csv que foi enviado, esse é o resultado correto. Mudando qualquer valor aqui, o teste vai falhar.
  // Como na avaliação outro conjunto de dados será utilizado, certamente os testes vão falhar lá.
  const expectedResponse = {
    min: [
      {
        producer: 'Joel Silver',
        interval: 1,
        previousWin: 1990,
        followingWin: 1991,
      },
    ],
    max: [
      {
        producer: 'Matthew Vaughn',
        interval: 13,
        previousWin: 2002,
        followingWin: 2015,
      },
    ],
  };
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

    expect(response.body).toEqual(expectedResponse);
  });

  afterAll(async () => {
    await app.close();
  });
});
