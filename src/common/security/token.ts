import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(
    payload: Record<string, string | number>,
    options: JwtSignOptions,
  ): Promise<string> {
    return await this.jwtService.signAsync(payload, options);
  }

  async verifyToken(
    token: string,
    options: JwtVerifyOptions,
  ): Promise<Record<string, any> | null> {
    return await this.jwtService.verifyAsync(token, options);
  }
}
