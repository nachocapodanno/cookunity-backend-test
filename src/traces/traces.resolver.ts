import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTraceInput } from './dto/create-trace.input';
import { Trace } from './entities/trace.entity';
import { TracesService } from './traces.service';

@Resolver(() => Trace)
export class TracesResolver {
  constructor(private readonly tracesService: TracesService) {}

  @Mutation(() => Trace)
  createTrace(@Args('createTraceInput') createTraceInput: CreateTraceInput) {
    return this.tracesService.create(createTraceInput);
  }

  @Query(() => [Trace], { name: 'traces' })
  findAll() {
    return this.tracesService.findAll();
  }
}
