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
    morgan.token('client-ip', function(req:Request) {
      const xForwardedFor = req.headers['x-forwarded-for'];
      let clientIp: string;

      if (Array.isArray(xForwardedFor)) {
        clientIp = xForwardedFor.join(', ');
      } else if (typeof xForwardedFor === 'string') {
        clientIp = xForwardedFor;
      } else {
        clientIp = req.socket.remoteAddress || '';
      }

      // Convert IPv6 localhost to IPv4 localhost
      if (clientIp === '::1' || clientIp === '::') {
        clientIp = '127.0.0.1';
      }

      return clientIp;

    });
    
    morgan(':client-ip :method :url :status', { stream: this.logStream })(req, res, next);
  }
}
