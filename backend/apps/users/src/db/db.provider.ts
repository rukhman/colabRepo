import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/users.model';

export const dbProvider = SequelizeModule.forRoot({
    dialect: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "root",
    database: "event-service",
    models: [User],
    autoLoadModels: true,
});