import { Table, Model, Column, DataType, HasOne } from 'sequelize-typescript';
import { EnumRole } from 'src/common/index';
import { StudentInformation } from './StudentInformation.model';
import { Optional } from 'sequelize';

export interface UserAttributes {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmed: boolean;
  role: EnumRole;
}

@Table
export class User extends Model<
  UserAttributes,
  Optional<UserAttributes, 'id'>
> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  })
  firstName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  })
  lastName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      notEmpty: true,
    },
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({ type: 'boolean', allowNull: false, defaultValue: false })
  confirmed: boolean;

  @Column({
    type: DataType.ENUM,
    allowNull: false,
    values: Object.values(EnumRole),
    defaultValue: EnumRole.user,
  })
  role: EnumRole;

  @HasOne(() => StudentInformation)
  studentInformation: StudentInformation;
}
