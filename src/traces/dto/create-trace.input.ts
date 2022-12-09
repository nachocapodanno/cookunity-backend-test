import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateTraceInput {
  @Field(() => String, { description: 'IP to be traced' })
  ip: string;
}
