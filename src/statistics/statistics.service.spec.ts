import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { GeolocalizationService } from '../traces/services/geolocalization.service';
import { Trace } from '../traces/schema/trace.schema';
import { TracesService } from '../traces/services/traces.service';
import { StatisticsService } from './statistics.service';
import { CurrencyConversionService } from '../traces/services/currency-conversion.service';
import { ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { CacheService } from '../cache/cache.service';
import { CACHE_MANAGER } from '@nestjs/common';

describe('StatisticsService', () => {
  let service: StatisticsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StatisticsService,
        TracesService,
        GeolocalizationService,
        CurrencyConversionService,
        ConfigService,
        CacheService,
        { provide: getModelToken(Trace.name), useValue: {} },
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: () => 'any value',
            set: () => jest.fn(),
          },
        },
      ],
      imports: [HttpModule],
    }).compile();

    service = module.get<StatisticsService>(StatisticsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
