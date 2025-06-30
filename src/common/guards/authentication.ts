import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { TokenDecodingClass } from '../utils';
import { UserRepoServices } from 'src/DB';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private readonly decodingService: TokenDecodingClass,
    private readonly userModule: UserRepoServices,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const authentication = request.headers['authorization'] as string;
    if (!authentication) throw new UnauthorizedException('Invalid Token');

    const decoded = await this.decodingService.Decoding(
      authentication,
      'accessToken',
    );

    const { email } = decoded;

    const user = await this.userModule.findOne({ email });

    if (!user) throw new UnauthorizedException('Invalid Token');

    request['user'] = user;

    return true;
  }
}
