import { AllowNull, AutoIncrement, Column, DataType, ForeignKey, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';
import { User } from './users.model';


@Table
export class Token extends Model {
    @AllowNull(false)
    @ForeignKey(() => User)
    @Column
    userId: string;

    @AllowNull(false)
    @Column
    refreshToken: string;
}