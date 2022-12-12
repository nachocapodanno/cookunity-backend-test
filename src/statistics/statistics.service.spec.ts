import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { GeolocalizationService } from '../traces/services/geolocalization.service';
import { Trace } from '../traces/schema/trace.schema';
import { TracesService } from '../traces/services/traces.service';
import { StatisticsService } from './statistics.service';
import { CurrencyConversionService } from '../traces/services/currency-conversion.service';
import { ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

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
        { provide: getModelToken(Trace.name), useValue: {} },
      ],
      imports: [HttpModule],
    }).compile();

    service = module.get<StatisticsService>(StatisticsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
