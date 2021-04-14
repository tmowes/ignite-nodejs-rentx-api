import { Response, Request, NextFunction } from 'express'
import { RateLimiterRedis } from 'rate-limiter-flexible'
import redis from 'redis'

import AppError from '@shared/errors/AppError'

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  enable_offline_queue: false,
})

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'rateLimiter',
  points: 10,
  duration: 1,
})

export const rateLimiter = async (
  request: Request,
  _response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await limiter.consume(request.ip)

    return next()
  } catch (error) {
    throw new AppError('Too many requests', 429)
  }
}
