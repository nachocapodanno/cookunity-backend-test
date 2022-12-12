import { Module } from '@nestjs/common';
import { TracesModule } from '../traces/traces.module';
import { StatisticsResolver } from './statistics.resolver';
import { StatisticsService } from './statistics.service';

@Module({
  imports: [TracesModule],
  providers: [StatisticsResolver, StatisticsService],
})
export class StatisticsModule {}
