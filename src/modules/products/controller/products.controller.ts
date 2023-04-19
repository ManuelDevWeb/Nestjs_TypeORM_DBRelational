import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  Res,
} from '@nestjs/common';

// Importando response para manipular la res
import { Response } from 'express';

// Los decoradores indican como se va a comportar la clase o el método

@Controller('products') // Indica que la clase es un controlador
export class ProductsController {
  @Get('/') // Example: products?limit=50&offset=1&brand=shoes
  // Indicamos que vamos a tener un HttpCode y enviamos un parametro del objeto HttpStatus (Tambien podriamos enviar uno personalizado -> @HttpCode(200))
  @HttpCode(HttpStatus.OK)
  // Indicamos que vamos a recibir parametros tipo query
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 50,
    @Query('brand') brand?: string,
  ) {
    return {
      body: {
        limit,
        offset,
        brand,
      },
    };
  }

  @Get('/:productId')
  // Indicamos que vamos a recibir un parámetro llamado productId y accediendo al responde de tipo Response Express
  getProduct(@Res() response: Response, @Param('productId') productId: string) {
    // Respondiendo con el formato de Express
    response.status(HttpStatus.ACCEPTED).send({
      body: {
        message: `Product ${productId}`,
      },
    });
  }

  @Post()
  // Indicamos que vamos a recibir data en el body
  create(@Body() payload: any) {
    return {
      body: {
        message: 'Accion de crear',
        payload,
      },
    };
  }

  @Put('/:productId')
  // Indicamos que vamos a recibir data en el body y un parametro llamado productId
  editProduct(@Param('productId') productId: string, @Body() payload: any) {
    return {
      body: {
        message: 'Accion de editar',
        id: productId,
        payload,
      },
    };
  }

  @Delete('/:productId')
  // Indicamos que vamos a recibir un parametro llamada productId
  deleteProduct(@Param('productId') productId: string) {
    return {
      body: {
        message: 'Accion de eliminar',
        id: productId,
      },
    };
  }
}
