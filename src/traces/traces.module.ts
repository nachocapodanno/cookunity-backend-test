import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheService } from '../cache/cache.service';
import { Trace, TraceSchema } from './schema/trace.schema';
import { CurrencyConversionService } from './services/currency-conversion.service';
import { GeolocalizationService } from './services/geolocalization.service';
import { TracesService } from './services/traces.service';
import { TracesResolver } from './traces.resolver';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: Trace.name, schema: TraceSchema }]),
  ],
  providers: [
    TracesResolver,
    TracesService,
    GeolocalizationService,
    CurrencyConversionService,
    CacheService,
  ],
  exports: [TracesService],
})
export class TracesModule {}
