import { Injectable, NestMiddleware, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

const rateLimit = require('express-rate-limit');

@Injectable()
export class RateLimiterMiddleware implements NestMiddleware {
  private readonly limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 10, // limit each IP to 10 requests per windowMs
    handler: (req: Request, res: Response) => {
      throw new HttpException('Too many requests, please try again later.', HttpStatus.TOO_MANY_REQUESTS);
    },
  });

  use(req: Request, res: Response, next: NextFunction): void {
    this.limiter(req, res, next);
  }
}
