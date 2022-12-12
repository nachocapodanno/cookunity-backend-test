import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { GeolocalizationService } from '../geolocalization.service';

describe('GeolocalizationService', () => {
  let service: GeolocalizationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeolocalizationService, ConfigService],
      imports: [HttpModule],
    }).compile();

    service = module.get<GeolocalizationService>(GeolocalizationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('get distance from a same point to same point"', async () => {
    const from = { lat: 40.7127837, lon: -74.0059413 };
    const to = { lat: 40.7127837, lon: -74.0059413 };
    const distance = await service.getDistanceFromLatLonToLatLonInKm(
      from.lat,
      from.lon,
      to.lat,
      to.lon,
    );
    expect(distance).toEqual(0);
  });

  it('get distance from a point to another"', async () => {
    const distanceFromNYtoSeattle = 3865.53;
    const from = { lat: 40.7127837, lon: -74.0059413 };
    const to = { lat: 47.6062095, lon: -122.3320708 };
    const distance = await service.getDistanceFromLatLonToLatLonInKm(
      from.lat,
      from.lon,
      to.lat,
      to.lon,
    );
    expect(distance).toEqual(distanceFromNYtoSeattle);
  });
});
