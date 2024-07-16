import type { CreationOptional, InferAttributes, InferCreationAttributes } from '@sequelize/core';
import { DataTypes, Model } from '@sequelize/core';
import { Attribute, AutoIncrement, Default, DeletedAt, NotNull, PrimaryKey, Table, Unique } from '@sequelize/core/decorators-legacy';
import dayjs from 'dayjs';

@Table({
  tableName: 'users',
  defaultScope: { attributes: { exclude: ['password'] } },
})
export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  @Attribute(DataTypes.BIGINT)
  @PrimaryKey
  @AutoIncrement
  @NotNull
  @Unique
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @NotNull
  @Unique
  declare email: string;

  @Attribute(DataTypes.STRING)
  set password(password: string) {
    this.setDataValue('password', Bun.password.hashSync(password, { algorithm: 'bcrypt', cost: 12 }));
  }

  @Attribute(DataTypes.DATE)
  @NotNull
  declare ipAddress: string;

  @Attribute(DataTypes.INTEGER)
  @Default(0)
  @NotNull
  declare failedLoginAttempts: CreationOptional<number>;

  @Attribute(DataTypes.DATE)
  @Default(dayjs().toDate())
  declare lastActive: CreationOptional<Date>;

  @Attribute(DataTypes.DATE)
  declare verifiedAt: Date | null;

  @Attribute(DataTypes.DATE)
  declare createdAt: CreationOptional<Date>;

  @Attribute(DataTypes.DATE)
  declare updatedAt: CreationOptional<Date>;

  @DeletedAt
  declare deletedAt: Date | null;
}
