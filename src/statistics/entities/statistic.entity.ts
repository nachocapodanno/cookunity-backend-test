import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class StatisticData {
  @Field(() => String, { description: 'Country name' })
  country: string;

  @Field(() => Number, { description: 'Statistic value' })
  value: number;
}

@ObjectType()
export class Statistic {
  @Field(() => StatisticData, {
    description: 'Statistic longest distance data',
  })
  longestDistance: StatisticData;

  @Field(() => StatisticData, {
    description: 'Statistic most traced data',
  })
  mostTraced: StatisticData;
}
