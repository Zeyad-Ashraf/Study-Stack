import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HashingServices, TokenService } from 'src/common';
import {
  StudentInformation,
  StudentInformationRepo,
  User,
  UserRepoServices,
} from 'src/DB';
import { JwtService } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([User, StudentInformation])],
  controllers: [AuthController],
  providers: [
    AuthService,
    HashingServices,
    TokenService,
    UserRepoServices,
    StudentInformationRepo,
    JwtService,
  ],
})
export class AuthModule {}
