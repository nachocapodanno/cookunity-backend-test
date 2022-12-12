import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../../../utils/mongo-test-helper';
import { TraceSchema } from '../../schema/trace.schema';
import { CurrencyConversionService } from '../currency-conversion.service';
import { GeolocalizationService } from '../geolocalization.service';
import { TracesService } from '../traces.service';

const geolocalizationMock = {
  findByIP: jest.fn(),
  getDistanceFromLatLonToLatLonInKm: jest.fn(),
};

const currencyMock = {
  converFromUsdToOtherCurrency: jest.fn(),
  getSymbols: jest.fn(),
};

describe('TracesService', () => {
  let service: TracesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TracesService,
        {
          provide: GeolocalizationService,
          useValue: geolocalizationMock,
        },
        {
          provide: CurrencyConversionService,
          useValue: currencyMock,
        },
      ],
      imports: [
        HttpModule,
        ConfigModule.forRoot({
          envFilePath: ['.env', '.env.sample'],
        }),
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: 'Trace', schema: TraceSchema }]),
      ],
    }).compile();

    service = module.get<TracesService>(TracesService);
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a trace"', async () => {
    const geoDTO = {
      country: 'Argentina',
      countryCode: 'AR',
      lat: -36,
      lon: -59.9964,
      currency: 'ARS',
    };
    const distanceToUsaDTO = 8509.69;
    const conversionDTO = {
      date: '2022-12-12',
      info: {
        rate: 0.00588,
        timestamp: 1670823123,
      },
      query: {
        amount: 1,
        from: 'ARS',
        to: 'USD',
      },
      result: 0.00588,
      success: true,
    };
    const symbolsDTO = {
      success: true,
      symbols: {
        AMD: 'Armenian Dram',
        ANG: 'Netherlands Antillean Guilder',
        AOA: 'Angolan Kwanza',
        ARS: 'Argentine Peso',
      },
    };
    geolocalizationMock.findByIP.mockReturnValue(geoDTO);
    geolocalizationMock.getDistanceFromLatLonToLatLonInKm.mockReturnValue(
      distanceToUsaDTO,
    );
    currencyMock.converFromUsdToOtherCurrency.mockReturnValue(conversionDTO);
    currencyMock.getSymbols.mockReturnValue(symbolsDTO);

    const newTrace = await service.create({ ip: '190.189.205.232' });
    const tracesFromDB = await service.find({});

    const traceStored = {
      ip: '190.189.205.232',
      countryName: 'Argentina',
      countryCode: 'AR',
      distanceToUsa: 8509.69,
    };

    const expectedResponse = {
      ip: '190.189.205.232',
      name: 'Argentina',
      code: 'AR',
      lat: -36,
      long: -59.9964,
      currencies: [
        { iso: 'ARS', symbol: 'Argentine Peso', conversionRate: 0.00588 },
        { iso: 'USD', symbol: '$', conversionRate: 1 },
      ],
      distanceToUsa: 8509.69,
    };
    expect(newTrace).toEqual(expectedResponse);
    expect(tracesFromDB.length).toBeGreaterThan(0);
    expect(tracesFromDB[0]).toMatchObject(traceStored);
  });
});
