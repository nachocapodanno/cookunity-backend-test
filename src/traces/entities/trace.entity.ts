import { ObjectType, Field } from '@nestjs/graphql';
import { Currency } from './currency.entity';

@ObjectType()
export class Trace {
  @Field(() => String, { description: 'IP requested' })
  ip: string;

  @Field(() => String, { description: 'Country name' })
  name: string;

  @Field(() => String, { description: 'Country code' })
  code: string;

  @Field(() => Number, { description: 'Country latitude' })
  lat: number;

  @Field(() => Number, { description: 'Country longitude' })
  long: number;

  @Field(() => [Currency], { description: 'Currencies data' })
  currencies: Currency[];

  @Field(() => Number, { description: 'Distance to USA' })
  distanceToUsa: number;
}
