import { AllowNull, AutoIncrement, Column, DataType, Default, ForeignKey, HasMany, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';
import { Token } from './tokens.model';


@Table
export class User extends Model {
    @AllowNull(false)
    @Unique(true)
    @Column
    name: string;

    @AllowNull(false)
    @Unique(true)
    @Column
    email: string;

    @AllowNull(false)
    @Column
    password: string;

    @AllowNull(false)
    @Default("USER")
    @Column
    role: string;

    @AllowNull(false)
    @Default(false)
    @Column
    isActivated: boolean;

    @AllowNull(false)
    @Column
    activationLink: string;

    @HasMany(() => Token)
    tokens: Token[];
}