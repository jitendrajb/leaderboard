// src/middleware/logger.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';
import * as morgan from 'morgan';
import * as path from 'path';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  
  private readonly logStream = fs.createWriteStream(path.join(__dirname, '../../access.log'), { flags: 'a' });

  use(req: Request, res: Response, next: NextFunction) {
    morgan.token('client-ip', function(req) {
      return req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    });

    morgan(':client-ip :method :url :status', { stream: this.logStream })(req, res, next);
  }
}
