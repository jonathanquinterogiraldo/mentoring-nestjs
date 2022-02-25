import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';

@Module({
  imports: [ProductModule,
    MongooseModule.forRoot('mongodb+srv://jonathanqg:Aa123456*@cluster0.6wmbu.mongodb.net/nestjs-inventory'),
    UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
