import Redis from 'ioredis'

export const redis =
  process.env.NODE_ENV === 'production'
    ? process.env.REDIS_HOST
      ? new Redis({ host: process.env.REDIS_HOST })
      : new Redis(process.env.REDIS_URL)
    : new Redis()
