import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

export const NO_EXPIRATION = 0;

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async add(key: string, item: string, ttl?: number) {
    await this.cacheManager.set(key, item, ttl);
  }

  async get(key: string) {
    const value = await this.cacheManager.get(key);
    return value;
  }
}
