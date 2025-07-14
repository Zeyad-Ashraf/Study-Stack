import { Optional } from 'sequelize';
import { Table, Model, Column, DataType } from 'sequelize-typescript';
import { EnumLevel } from 'src/common';

export interface cloudLnk {
  public_id: string;
  secure_url: string;
}

interface sessionInfo {
  id: number;
  sessionTitle: string;
  sessionNumber: number;
  sessionLevel: string;
  cloudLink: cloudLnk;
}

@Table
export class SessionInfo extends Model<
  sessionInfo,
  Optional<sessionInfo, 'id'>
> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare sessionTitle: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
    },
  })
  declare sessionNumber: number;

  @Column({
    type: DataType.ENUM,
    values: Object.values(EnumLevel),
    allowNull: false,
  })
  declare sessionLevel: EnumLevel;

  @Column({
    type: DataType.JSON,
    allowNull: false,
  })
  declare cloudLink: cloudLnk;
}
