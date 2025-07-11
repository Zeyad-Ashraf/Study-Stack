import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GenerateOtpObject } from 'src/common';
import { StudentInformation, StudentInformationRepo } from 'src/DB';
import { SequelizeModule } from '@nestjs/sequelize';
import { SharedModule } from '../SharedModule/shared.module';

@Module({
  imports: [SequelizeModule.forFeature([StudentInformation]), SharedModule],
  controllers: [AuthController],
  providers: [AuthService, StudentInformationRepo, GenerateOtpObject],
})
export class AuthModule {}
