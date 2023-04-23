import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './modules/products/controller/products.controller';
import { CategoriesController } from './modules/categories/controller/categories.controller';
import { ProductsService } from './modules/products/service/products.service';
import { CategoriesService } from './modules/categories/service/categories.service';

@Module({
  imports: [],
  controllers: [AppController, ProductsController, CategoriesController],
  providers: [AppService, ProductsService, CategoriesService],
})
export class AppModule {}
