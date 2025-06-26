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
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Column({
    type: DataType.ENUM,
    values: Object.values(EnumLevel),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  })
  student_level: EnumLevel;
}
