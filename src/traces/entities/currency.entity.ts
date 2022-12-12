import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Currency {
  @Field(() => String, { description: 'Currency ISO' })
  iso: string;

  @Field(() => String, { description: 'Currency symbol' })
  symbol: string;

  @Field(() => String, { description: 'Country conversion rate against USD' })
  conversionRate: number;
}
