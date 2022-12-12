import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, PipelineStage, QueryOptions } from 'mongoose';
import { CreateTraceInput } from '../dto/create-trace.input';
import { TraceDto } from '../dto/trace.dto';
import { Trace } from '../entities/trace.entity';
import { TraceDocument } from '../schema/trace.schema';
import {
  CurrencyConversionService,
  USD_CURRENCY_DATA,
} from './currency-conversion.service';
import { GeolocalizationService, USAGeoData } from './geolocalization.service';

@Injectable()
export class TracesService {
  constructor(
    @InjectModel(Trace.name)
    private readonly traceModel: Model<TraceDocument>,
    private readonly geolocalizationService: GeolocalizationService,
    private readonly currencyConversionService: CurrencyConversionService,
  ) {}

  async create(createTraceInput: CreateTraceInput): Promise<Trace> {
    const { ip } = createTraceInput;
    const {
      country = '',
      countryCode = '',
      lat: traceLatitude = 0,
      lon: traceLongitude = 0,
      currency,
    } = await this.geolocalizationService.findByIP(ip);

    const distanceToUsa =
      this.geolocalizationService.getDistanceFromLatLonToLatLonInKm(
        traceLatitude,
        traceLongitude,
        USAGeoData.latitude,
        USAGeoData.longitude,
      );

    const traceDTO: TraceDto = {
      ip,
      countryName: country,
      countryCode,
      distanceToUsa,
    };
    await this.traceModel.create(traceDTO);

    const currencyData =
      await this.currencyConversionService.converFromUsdToOtherCurrency(
        currency,
      );
    // TODO: save this in DB. Use a cron for keeping it up to date each period of time.
    const currencySymbols = await this.currencyConversionService.getSymbols();
    const symbol = currencySymbols.symbols[currency];

    const traceResponse: Trace = {
      ip,
      name: country,
      code: countryCode,
      lat: traceLatitude,
      long: traceLongitude,
      currencies: [
        {
          iso: currency,
          symbol,
          conversionRate: currencyData.result,
        },
        USD_CURRENCY_DATA,
      ],
      distanceToUsa,
    };
    return traceResponse;
  }

  find(
    filter: FilterQuery<Trace>,
    options?: QueryOptions<Trace>,
  ): Promise<TraceDocument[]> {
    return this.traceModel.find(filter, null, options).exec();
  }

  aggregate(pipeline: PipelineStage[]) {
    return this.traceModel.aggregate(pipeline);
  }
}
