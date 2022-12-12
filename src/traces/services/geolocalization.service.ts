import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// Washington DC
export const USAGeoData = {
  latitude: 38.89511,
  longitude: -77.03637,
};

enum API_STATUS {
  FAIL = 'fail',
  SUCCESS = 'success',
}

@Injectable()
export class GeolocalizationService {
  private apiURL: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiURL = this.configService.get<string>('GEO_IP_API_URL', '');
  }

  async findByIP(ip: string) {
    const geoResponse = await this.httpService.axiosRef
      .get(
        `${this.apiURL}${ip}?fields=status,message,country,countryCode,lat,lon,currency`,
      )
      .catch((error) => {
        const { status, error: errorMessage } = error;
        throw new HttpException(errorMessage, status);
      });

    if (geoResponse?.data.status === API_STATUS.FAIL)
      throw new HttpException(
        `API Geoloalization Error: ${geoResponse?.data.message}`,
        geoResponse?.data.status,
      );
    return geoResponse?.data;
  }

  getDistanceFromLatLonToLatLonInKm(
    latitudeFrom: number,
    longitudeFrom: number,
    latitudeTo: number,
    longitudeTo: number,
  ) {
    const R = 6371; // Radius of the earth in km
    const dLat = this.deg2rad(latitudeTo - latitudeFrom);
    const dLon = this.deg2rad(longitudeTo - longitudeFrom);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(latitudeFrom)) *
        Math.cos(this.deg2rad(latitudeTo)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return Number(d.toFixed(2));
  }

  deg2rad(deg: number) {
    return deg * (Math.PI / 180);
  }
}
