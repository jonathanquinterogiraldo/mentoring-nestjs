import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './user/orm.config';
import { AuthModule } from './auth/auth.module';
require('dotenv').config()

@Module({
  imports: [ProductModule,
    MongooseModule.forRoot(process.env.CONNECTION_MONGODB),
    TypeOrmModule.forRoot(config),
    UserModule,
    AuthModule,  
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
