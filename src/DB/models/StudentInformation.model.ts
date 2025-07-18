import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Table,
  Model,
} from 'sequelize-typescript';
import { User } from './users.model';
import { Optional } from 'sequelize';
import { EnumLevel } from 'src/common';

interface StudentInformationAttributes {
  id: number;
  userId: number;
  student_level: string;
}

@Table
export class StudentInformation extends Model<
  StudentInformationAttributes,
  Optional<StudentInformationAttributes, 'id'>
> {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare userId: number;

  @BelongsTo(() => User)
  declare user: User;

  @Column({
    type: DataType.ENUM,
    values: Object.values(EnumLevel),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  })
  declare student_level: EnumLevel;
}
