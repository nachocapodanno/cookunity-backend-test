import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { GeolocalizationService } from '../traces/services/geolocalization.service';
import { Trace } from '../traces/schema/trace.schema';
import { TracesService } from '../traces/services/traces.service';
import { StatisticsResolver } from './statistics.resolver';
import { StatisticsService } from './statistics.service';
import { ConfigService } from '@nestjs/config';
import { CurrencyConversionService } from '../traces/services/currency-conversion.service';
import { HttpModule } from '@nestjs/axios';
import { CacheService } from '../cache/cache.service';
import { CACHE_MANAGER } from '@nestjs/common';

describe('StatisticsResolver', () => {
  let resolver: StatisticsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StatisticsResolver,
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

    resolver = module.get<StatisticsResolver>(StatisticsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
