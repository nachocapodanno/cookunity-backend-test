// import { getModelToken } from '@nestjs/mongoose';
// import { Test, TestingModule } from '@nestjs/testing';
// import { AppService } from './app.service';
// import { AppResolver } from './resolvers/app.resolver';
// import { Hello } from './schema/hello.schema';

// const mappingModel = {
//   findOne: jest.fn(),
//   find: jest.fn(),
//   create: jest.fn(),
// };

// describe('AppResolver', () => {
//   let appResolver: AppResolver;
//   let service: AppService;

//   beforeEach(async () => {
//     const app: TestingModule = await Test.createTestingModule({
//       controllers: [AppResolver],
//       providers: [
//         AppService,
//         { provide: getModelToken(Hello.name), useValue: mappingModel },
//       ],
//     }).compile();

//     service = app.get<AppService>(AppService);
//     appResolver = app.get<AppResolver>(AppResolver);
//   });

//   describe('root', () => {
//     it('should return "Hello World!"', async () => {
//       jest.spyOn(service, 'create').mockResolvedValue({ name: 'Nac' });
//       const res = await appResolver.hello();
//       expect(res).toBe('Nac');
//     });
//   });
// });
