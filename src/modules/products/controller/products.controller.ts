import { Controller, Get, Query, Param } from '@nestjs/common';

// Los decoradores indican como se va a comportar la clase o el método

@Controller('products') // Indica que la clase es un controlador
export class ProductsController {
  @Get('/') // Example: products?limit=50&offset=1&brand=shoes
  // Indicamos que vamos a recibir parametros tipo query
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 50,
    @Query('brand') brand: string,
  ) {
    return `Products: limit => ${limit}, offset => ${offset}, brand => ${brand}`;
  }

  @Get('/:productId')
  // Indicamos que vamos a recibir un parámetro llamado productId
  getProduct(@Param('productId') productId: string) {
    return `Product ${productId}`;
  }
}
