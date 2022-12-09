import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTraceInput } from './dto/create-trace.input';
import { Trace, TraceDocument } from './schema/trace.schema';
import { GeolocalizationService } from './services/geolocalization.service';

@Injectable()
export class TracesService {
  constructor(
    @InjectModel(Trace.name)
    private readonly traceModel: Model<TraceDocument>,
    private readonly geolocalizationService: GeolocalizationService,
  ) {}

  async create(createTraceInput: CreateTraceInput) {
    const { ip } = createTraceInput;
    const data = await this.geolocalizationService.findByIP(ip);
    console.log(data);
    return this.traceModel.create(createTraceInput);
  }

  findAll() {
    return `This action returns all traces`;
  }
}
