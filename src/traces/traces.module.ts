import { Module } from '@nestjs/common';
import { TracesService } from './services/traces.service';
import { TracesResolver } from './traces.resolver';
import { Trace, TraceSchema } from './schema/trace.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { GeolocalizationService } from './services/geolocalization.service';
import { HttpModule } from '@nestjs/axios';
import { CurrencyConversionService } from './services/currency-conversion.service';

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
  ],
  exports: [TracesService],
})
export class TracesModule {}
