import { SequelizeModule } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { User } from './models/users.model';
import { Token } from './models/tokens.model';

export const dbProvider = SequelizeModule.forRoot({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'root',
    database: 'event-service',
    models: [User, Token],
    autoLoadModels: true,
    synchronize: true
});