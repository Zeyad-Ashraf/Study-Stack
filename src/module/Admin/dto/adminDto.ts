import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Min } from 'sequelize-typescript';
import { EnumLevel } from 'src/common';

export class createSessionDto {
  @IsString()
  @IsNotEmpty()
  sessionTitle: string;

  @Transform((value) => Number(value))
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  sessionNumber: string;

  @IsEnum(EnumLevel)
  @IsNotEmpty()
  sessionLevel: EnumLevel;
}
