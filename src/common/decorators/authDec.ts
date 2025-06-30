import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { EnumRole } from '../types';
import { AuthenticationGuard, RolesGuard } from '../guards';

export function Auth(...roles: EnumRole[]) {
  return applyDecorators(
    SetMetadata(process.env.AUTH_KEY, roles),
    UseGuards(AuthenticationGuard, RolesGuard),
  );
}
