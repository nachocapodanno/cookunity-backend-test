import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Trace } from './schema/trace.schema';
import { TracesService } from './traces.service';

const traceModelMock = {
  findOne: jest.fn(),
  find: jest.fn(),
  create: jest.fn(),
};

describe('TracesService', () => {
  let service: TracesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TracesService,
        { provide: getModelToken(Trace.name), useValue: traceModelMock },
      ],
    }).compile();

    service = module.get<TracesService>(TracesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a trace"', async () => {
    const traceDTO = { ip: '190.189.205.232' };
    traceModelMock.create.mockReturnValue(traceDTO);
    const newTrace = await service.create(traceDTO);
    expect(newTrace).toMatchObject(traceDTO);
    expect(traceModelMock.create).toHaveBeenCalledWith(traceDTO);
  });
});
