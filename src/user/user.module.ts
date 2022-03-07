import { Module, Logger } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), Repository
  ],
  providers: [UserService,Logger],
  controllers: [UserController],
  exports: [UserService]
})

export class UserModule {}
