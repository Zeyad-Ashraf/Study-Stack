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
  confirmed?: boolean;
  role: EnumRole;
  otp?: {
    otp: string;
    createdAt: Date | null;
    expireAt: Date | null;
  };
}

interface OtpInterface {
  otp: string;
  createdAt: Date | null;
  expireAt: Date | null;
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
  declare firstName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  })
  declare lastName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      notEmpty: true,
    },
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;

  @Column({ type: 'boolean', allowNull: false, defaultValue: false })
  declare confirmed: boolean;

  @Column({
    type: DataType.ENUM,
    allowNull: false,
    values: Object.values(EnumRole),
    defaultValue: EnumRole.user,
  })
  declare role: EnumRole;

  @Column({
    type: DataType.JSONB,
    allowNull: false,
  })
  declare otp: OtpInterface;

  @HasOne(() => StudentInformation, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  declare studentInformation: StudentInformation;
}
