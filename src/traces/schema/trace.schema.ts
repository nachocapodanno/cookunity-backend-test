import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TraceDocument = HydratedDocument<Trace>;

@Schema()
export class Trace {
  @Prop()
  ip: string;

  @Prop()
  countryName: string;

  @Prop()
  countryCode: string;

  @Prop()
  distanceToUsa: number;
}

export const TraceSchema = SchemaFactory.createForClass(Trace);
