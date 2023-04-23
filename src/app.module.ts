import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './modules/products/controller/products.controller';
import { CategoriesController } from './modules/categories/controller/categories.controller';
import { ProductsService } from './modules/products/service/products.service';
import { CategoriesService } from './modules/categories/service/categories.service';
import { BrandsController } from './modules/brands/controller/brands.controller';
import { BrandsService } from './modules/brands/service/brands.service';
import { UsersController } from './modules/users/controller/users.controller';
import { UsersService } from './modules/users/service/users.service';
import { CustomersController } from './modules/customers/controller/customers.controller';
import { CustomersService } from './modules/customers/service/customers.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    ProductsController,
    CategoriesController,
    BrandsController,
    UsersController,
    CustomersController,
  ],
  providers: [AppService, ProductsService, CategoriesService, BrandsService, UsersService, CustomersService],
})
export class AppModule {}
