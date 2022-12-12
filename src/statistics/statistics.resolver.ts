import { Query, Resolver } from '@nestjs/graphql';
import { Statistic } from './entities/statistic.entity';
import { StatisticsService } from './statistics.service';

@Resolver(() => Statistic)
export class StatisticsResolver {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Query(() => Statistic, { name: 'statistics' })
  async getStatistics() {
    const longestDistance =
      await this.statisticsService.getLongestDistanceStatistic();
    const mostTraced = await this.statisticsService.getMostTracedStatistic();
    return { longestDistance, mostTraced };
  }
}
