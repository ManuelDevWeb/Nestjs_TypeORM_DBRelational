import { Controller, Get, Param } from '@nestjs/common';

// Los decoradores indican como se va a comportar la clase o el método

@Controller('categories') // Indica que la clase es un controlador
export class CategoriesController {
  @Get('/:categoryId/products/:productId')
  // Indicamos que vamos a recibir un parametro llamado categoryId y otro llamado productId
  getProductByCategoryIdAndProductId(
    @Param('categoryId') categoryId: string,
    @Param('productId') productId: string,
  ) {
    return `Product ${productId} from category ${categoryId}`;
  }
}
