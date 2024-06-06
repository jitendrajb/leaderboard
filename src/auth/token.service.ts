// token.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(username: string, role: string): string {
    const payload = { username, role };
    return this.jwtService.sign(payload);
  }
}
