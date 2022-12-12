import { Injectable } from '@nestjs/common';
import { Trace } from 'src/traces/schema/trace.schema';
import { TracesService } from '../traces/services/traces.service';
import { StatisticData } from './entities/statistic.entity';

@Injectable()
export class StatisticsService {
  constructor(private readonly traceService: TracesService) {}

  async getLongestDistanceStatistic(): Promise<StatisticData> {
    const data = await await this.traceService.find(
      {},
      { sort: { distanceToUsa: 'DESC' } },
    );
    const { countryName: country = '', distanceToUsa: value = 0 }: Trace =
      data[0] || {};
    return { country, value };
  }

  async getMostTracedStatistic(): Promise<StatisticData> {
    const data = await await this.traceService.aggregate([
      { $group: { _id: '$countryName', count: { $count: {} } } },
      { $sort: { count: -1 } },
    ]);
    const { _id: country = '', count: value = 0 } = data[0] || {};
    return { country, value };
  }
}
