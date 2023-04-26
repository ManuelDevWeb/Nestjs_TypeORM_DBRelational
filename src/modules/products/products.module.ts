import { Module } from '@nestjs/common';

// Controllers
import { ProductsController } from './controller/products.controller';
import { BrandsController } from './controller/brands.controller';
import { CategoriesController } from './controller/categories.controller';
// Services
import { ProductsService } from './service/products.service';
import { BrandsService } from './service/brands.service';
import { CategoriesService } from './service/categories.service';

@Module({
  // Indicamos los controllers
  controllers: [ProductsController, BrandsController, CategoriesController],
  // Indicamos los services
  providers: [ProductsService, BrandsService, CategoriesService],
})
export class ProductsModule {}
