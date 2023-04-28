import { Module } from '@nestjs/common';

// Controllers
import { UsersController } from './controller/users.controller';
import { CustomersController } from './controller/customers.controller';
// Services
import { UsersService } from './service/users.service';
import { CustomersService } from './service/customers.service';

// Importando modulo externo de products, esto nos dara acceso a lo que se esta exportando dentro de el. En este caso el service de products
import { ProductsModule } from '../products/products.module';

@Module({
  // Importando modulo externo
  imports: [ProductsModule],
  // Indicamos los controllers
  controllers: [UsersController, CustomersController],
  // Indicamos los services
  providers: [UsersService, CustomersService],
})
export class UsersModule {}
