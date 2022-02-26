import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const config: TypeOrmModuleOptions = {
    type: 'postgres',
    username: 'pttrxdqu',
    password: 'PyhERrwjnP8r9bLBzkDnUfyfmOww8_o-',
    port: 5432,
    host: 'kashin.db.elephantsql.com',
    database: 'pttrxdqu',
    synchronize: true,
    entities: ['dist/**/*.entity{.ts,.js}']
}