import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenService } from '../security';

interface DecodedToken {
  id: string;
  email: string;
  role: string;
  iat: number;
}

@Injectable()
export class TokenDecodingClass {
  constructor(private readonly tokenService: TokenService) {}

  async Decoding(
    authorization: string,
    service: string,
  ): Promise<DecodedToken> {
    const [prefix, token] = authorization.split(' ');
    if (!prefix || !token)
      throw new UnauthorizedException('Token not completed');

    let SIGNATURE: string | undefined = undefined;
    if (service === 'refreshToken') {
      if (prefix === 'Bearer') SIGNATURE = process.env.JWT_REFRESH_SECRET_USERS;
      else if (prefix === 'Admin')
        SIGNATURE = process.env.JWT_REFRESH_SECRET_ADMIN;
      else throw new UnauthorizedException('Invalid Prefix');
    } else if (service === 'accessToken') {
      if (prefix === 'Bearer') SIGNATURE = process.env.JWT_ACCESS_SECRET_USERS;
      else if (prefix === 'Admin')
        SIGNATURE = process.env.JWT_ACCESS_SECRET_ADMIN;
      else throw new UnauthorizedException('Invalid Prefix');
    }

    try {
      const decoded = (await this.tokenService.verifyToken(token, {
        secret: SIGNATURE,
      })) as DecodedToken;

      if (!decoded.id || !decoded.email)
        throw new UnauthorizedException('Invalid Token');

      return decoded;
    } catch (error: any) {
      if (
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        error.name === 'JsonWebTokenError' &&
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        error.message === 'invalid signature'
      ) {
        throw new UnauthorizedException(
          'Token signature is invalid. Please log in again.',
        );
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException(
          'Token has expired. Please log in again.',
        );
      }

      // أي نوع خطأ تاني
      throw new UnauthorizedException('Invalid or malformed token');
    }
  }
}
