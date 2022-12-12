import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const USD_CURRENCY_DATA = {
  iso: 'USD',
  symbol: '$',
  conversionRate: 1,
};

@Injectable()
export class CurrencyConversionService {
  private apiURL: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiURL = this.configService.get<string>('FIXER_API_URL', '');
  }

  async converFromUsdToOtherCurrency(symbol: string) {
    const conversionResponse = await this.httpService.axiosRef
      .get(`${this.apiURL}convert?from=${symbol}&to=USD&amount=1`, {
        headers: {
          apiKey: this.configService.get<string>('FIXER_API_KEY', ''),
        },
      })
      .catch((error) => {
        const { status, error: errorMessage } = error;
        throw new HttpException(errorMessage, status);
      });
    return conversionResponse?.data;
  }

  async getSymbols() {
    const conversionResponse = await this.httpService.axiosRef
      .get(`${this.apiURL}symbols`, {
        headers: {
          apiKey: this.configService.get<string>('FIXER_API_KEY') ?? '',
        },
      })
      .catch((error) => {
        const { status, error: errorMessage } = error;
        throw new HttpException(errorMessage, status);
      });
    return conversionResponse?.data;
  }
}
