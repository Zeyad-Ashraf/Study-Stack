import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { EnumRole } from '../types';
import { User } from 'src/DB';

interface NewRequest extends Request {
  user?: User;
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<EnumRole[]>(
      process.env.AUTH_KEY,
      context.getHandler(),
    );
    if (!requiredRoles) {
      return true;
    }
    const request: NewRequest = context.switchToHttp().getRequest();

    const user = request.user;

    return user ? requiredRoles.includes(user.role) : false;
  }
}
