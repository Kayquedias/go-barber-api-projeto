import Redis, { Redis as RedisClient } from 'ioredis'

import cacheConfig from '@config/cache'
import ICacheProvider from '../models/ICacheProvider'

export default class RedisCacheProvider implements ICacheProvider {
  private client: RedisClient

  constructor() {
    this.client = new Redis(cacheConfig.config.redis)
  }

  async save<T>(key: string, value: T): Promise<void> {
    await this.client.set(key, JSON.stringify(value))
  }

  async recover<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key)

    if (!data) {
      return null
    }

    const parsedData = JSON.parse(data)

    return parsedData
  }

  async invalidate(key: string): Promise<void> {
    await this.client.del(key)
  }

  async invalidatePrefix(prefix: string): Promise<void> {
    const keys = await this.client.keys(`${prefix}:*`)

    const pipeline = this.client.pipeline()

    keys.forEach(key => {
      pipeline.del(key)
    })
    pipeline.exec()
  }
}
