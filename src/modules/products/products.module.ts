import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Controllers
import { ProductsController } from './controller/products.controller';
import { BrandsController } from './controller/brands.controller';
import { CategoriesController } from './controller/categories.controller';
// Services
import { ProductsService } from './service/products.service';
import { BrandsService } from './service/brands.service';
import { CategoriesService } from './service/categories.service';
// Entidades
import { Brand } from './entities/brand.entity';
import { Category } from './entities/category.entity';
import { Product } from './entities/product.entity';

@Module({
  // Importando el modulo de typeorm para que administre las entidades
  imports: [TypeOrmModule.forFeature([Product, Category, Brand])],
  // Indicamos los controllers
  controllers: [ProductsController, BrandsController, CategoriesController],
  // Indicamos los services
  providers: [ProductsService, BrandsService, CategoriesService],
  // Exportando el modulo para que otros modulos puedan usar los servicios de ProductsModule
  // Exportamos el typeorm module para que otros modulos puedan usarlo
  exports: [ProductsService, TypeOrmModule],
})
export class ProductsModule {}
