import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import {
  AuthenticationGuard,
  HashingServices,
  RolesGuard,
  TokenDecodingClass,
  TokenService,
} from 'src/common';
import { User, UserRepoServices } from 'src/DB';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [],
  providers: [
    JwtService,
    TokenService,
    TokenDecodingClass,
    HashingServices,
    UserRepoServices,
    AuthenticationGuard,
    RolesGuard,
  ],
  exports: [
    JwtService,
    TokenService,
    TokenDecodingClass,
    HashingServices,
    UserRepoServices,
    AuthenticationGuard,
    RolesGuard,
  ],
})
export class SharedModule {}
