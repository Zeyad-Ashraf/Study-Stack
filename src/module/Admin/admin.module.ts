import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminServices } from './admin.service';
import { SharedModule } from '../SharedModule/shared.module';
import { SessionInfo } from 'src/DB';
import { sessionsRepoServices } from 'src/DB/repo/sessionsRep';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SharedModule, SequelizeModule.forFeature([SessionInfo])],
  controllers: [AdminController],
  providers: [AdminServices, sessionsRepoServices],
})
export class AdminModule {}
