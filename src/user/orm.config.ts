import { TypeOrmModuleOptions } from '@nestjs/typeorm';
require('dotenv').config()

export const config: TypeOrmModuleOptions = {
    type: 'postgres',
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    port: parseInt(process.env.POSTGRES_PORT),
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    synchronize: true,
    entities: ['dist/**/*.entity{.ts,.js}']
}

