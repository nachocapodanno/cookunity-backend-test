import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('TracesResolver (e2e)', () => {
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
        query: `mutation {
        createTrace(createTraceInput:{ip: "190.189.205.232"}) {
          ip
          name
          code
          lat
          long
          currencies {
            iso
            symbol
            conversionRate
          }
          distanceToUsa
        }
      }`,
      })
      .expect(404);
  });

  it('mutation bad request', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `mutation {
        createWrongMutations(createTraceInputWrong:{ip: 123}) {
          ip
          name
          code
          lat
          long
          currencies {
            iso
            symbol
            conversionRate
          }
          distanceToUsa
        }
      }`,
      })
      .expect(400);
  });

  it('invalid ip', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `mutation {
          createTrace(createTraceInput:{ip: "888.888.111.111"}) {
            ip
            name
            code
            lat
            long
            currencies {
              iso
              symbol
              conversionRate
            }
            distanceToUsa
          }
        }`,
      })
      .expect(200)
      .expect(({ body }) => {
        const { errors } = body;
        expect(errors).toBeDefined();
      });
  });

  it('create trace correctly', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `mutation {
          createTrace(createTraceInput:{ip: "190.189.205.232"}) {
            ip
            name
            code
            lat
            long
            currencies {
              iso
              symbol
              conversionRate
            }
            distanceToUsa
          }
        }`,
      })
      .expect(200)
      .expect(({ body }) => {
        const { data } = body;
        expect(data).toMatchObject({
          createTrace: {
            ip: '190.189.205.232',
            name: 'Argentina',
            code: 'AR',
            lat: -36,
            long: -59.9964,
            currencies: [
              {
                iso: 'ARS',
                symbol: 'Argentine Peso',
              },
              {
                iso: 'USD',
                symbol: '$',
                conversionRate: '1',
              },
            ],
            distanceToUsa: 8509.69,
          },
        });
      });
  });
});
