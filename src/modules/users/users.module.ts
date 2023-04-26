import { Module } from '@nestjs/common';

// Controllers
import { UsersController } from './controller/users.controller';
import { CustomersController } from './controller/customers.controller';
// Services
import { UsersService } from './service/users.service';
import { CustomersService } from './service/customers.service';

@Module({
  // Indicamos los controllers
  controllers: [UsersController, CustomersController],
  // Indicamos los services
  providers: [UsersService, CustomersService],
})
export class UsersModule {}
