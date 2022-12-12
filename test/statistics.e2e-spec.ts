import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Statistic } from 'src/statistics/entities/statistic.entity';

describe('StatisticsResolver (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('wrong api url', () => {
    return request(app.getHttpServer())
      .post('/wrongurl')
      .send({
        query: `
        query {
          statistics {
            longestDistance {
              country
              value
            }
          }
        }
        `,
      })
      .expect(404);
  });

  it('query bad request', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
        query {
          statistics {
            wrongField {
              wrongField
            }
          }
        }
        `,
      })
      .expect(400);
  });

  it('get statistics correctly', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `query {
          statistics {
            longestDistance {
              country
              value
            }
            mostTraced {
              country
              value
            }
          }
        }`,
      })
      .expect(200)
      .expect(({ body }) => {
        const {
          mostTraced: { country: mostTracedCountry, value: mostTracedValue },
          longestDistance: {
            country: longestDistanceCountry,
            value: longestDistanceValue,
          },
        }: Statistic = body.data.statistics;
        expect(mostTracedCountry).toBeDefined();
        expect(mostTracedValue).toBeDefined();
        expect(longestDistanceCountry).toBeDefined();
        expect(longestDistanceValue).toBeDefined();
      });
  });
});
