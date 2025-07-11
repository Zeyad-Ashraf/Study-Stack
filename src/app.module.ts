import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './module/Auth/auth.module';
import { SharedModule } from './module/SharedModule/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './config/.env',
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadModels: true,
      synchronize: true,
    }),
    AuthModule,
    SharedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
