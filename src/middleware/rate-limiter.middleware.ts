import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ConfigService } from '@nestjs/config';

const rateLimit = require('express-rate-limit');

@Injectable()
export class RateLimiterMiddleware implements NestMiddleware {
  private limiter;
  constructor(private readonly configService: ConfigService) {
    this.limiter = rateLimit({
      windowMs: this.configService.get<number>('RATE_LIMIT_TIME_WINDOW', 60000), // Default to 1 minute if not specified in .env
      max: this.configService.get<number>('RATE_LIMIT_MAX_REQUESTS', 10), // Default to 10 requests if not specified in .env
      handler: (req: Request, res: Response) => {
        throw new HttpException('Too many requests, please try again later.', HttpStatus.TOO_MANY_REQUESTS);
      },
    });
  }

  use(req: Request, res: Response, next: NextFunction): void {
    this.limiter(req, res, next);
  }
}
