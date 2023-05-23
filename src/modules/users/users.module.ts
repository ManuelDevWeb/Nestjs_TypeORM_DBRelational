import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Controllers
import { UsersController } from './controller/users.controller';
import { CustomersController } from './controller/customers.controller';
import { OrdersController } from './controller/orders.controller';
import { OrderItemController } from './controller/order-item.controller';
// Services
import { UsersService } from './service/users.service';
import { CustomersService } from './service/customers.service';
import { OrdersService } from './service/orders.service';
import { OrderItemService } from './service/order-item.service';
// Entidades
import { User } from './entities/user.entity';
import { Customer } from './entities/customer.entity';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';

// Importando modulo externo de products, esto nos dara acceso a lo que se esta exportando dentro de el. En este caso el service de products
import { ProductsModule } from '../products/products.module';

@Module({
  // Importando modulo externo y modulo de typeorm para que administre las entidades
  imports: [
    ProductsModule,
    TypeOrmModule.forFeature([User, Customer, Order, OrderItem]),
  ],
  // Indicamos los controllers
  controllers: [
    UsersController,
    CustomersController,
    OrdersController,
    OrderItemController,
  ],
  // Indicamos los services
  providers: [UsersService, CustomersService, OrdersService, OrderItemService],
})
export class UsersModule {}
