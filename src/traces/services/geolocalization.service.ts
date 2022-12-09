import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GeolocalizationService {
  apiURL: string;
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.apiURL = this.configService.get<string>('GEO_IP_API_URL') ?? '';
  }
  async findByIP(ip: string) {
    const geoResponse = await this.httpService.axiosRef
      .get(`${this.apiURL}${ip}`)
      .catch((error) => {
        const { status, error: errorMessage } = error;
        throw new HttpException(errorMessage, status);
      });
    return geoResponse?.data;
  }
}
