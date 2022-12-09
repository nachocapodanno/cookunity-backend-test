import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Trace {
  @Field(() => String, { description: 'Example field (placeholder)' })
  ip: string;
}
