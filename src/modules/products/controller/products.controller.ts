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
  // ParseIntPipe,
} from '@nestjs/common';
// Importando Pipe personalizado
import { ParseIntPipe } from '../../../common/parse-int/parse-int.pipe';
// Importando DTO (Data Transfer Object)
import {
  CreateProductDto,
  UpdateProductDto,
} from '../dtos/products.dtos';

// Importando response para manipular la res
import { Response } from 'express';

// Importando el servicio de productos
import { ProductsService } from '../service/products.service';

// Los decoradores indican como se va a comportar la clase o el método

@Controller('products') // Indica que la clase es un controlador
export class ProductsController {
  constructor(
    // Inyectando dependencia (Se crea automaticamente una instancia de la clase ProductsService y se inyecta en el constructor)
    private productsService: ProductsService,
  ) {}

  @Get('/') // Example: products?limit=50&offset=1&brand=shoes
  // Indicamos que vamos a tener un HttpCode y enviamos un parametro del objeto HttpStatus (Tambien podriamos enviar uno personalizado -> @HttpCode(200))
  @HttpCode(HttpStatus.OK)
  // Indicamos que vamos a recibir parametros tipo query
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 50,
    @Query('brand') brand?: string,
  ) {
    // return {
    //   body: {
    //     limit,
    //     offset,
    //     brand,
    //   },
    // };
    const products = this.productsService.findAll();

    return {
      body: {
        data: products,
        pagination: {
          limit,
          offset,
          brand,
        },
      },
    };
  }

  @Get('/:productId')
  // Indicamos que vamos a recibir un parámetro llamado productId (Lo convertimos en numerico gracias al pipe ParseIntPipe) y accediendo al responde de tipo Response Express
  getProduct(
    @Res() res: Response,
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    // Respondiendo con el formato de Express
    // res.status(HttpStatus.ACCEPTED).send({
    //   body: {
    //     message: `Product ${productId}`,
    //   },
    // });
    const product = this.productsService.findOne(productId);

    res.status(HttpStatus.OK).send({
      body: {
        data: product,
      },
    });
  }

  @Post()
  // Indicamos que vamos a recibir data en el body
  create(@Body() payload: CreateProductDto) {
    // return {
    //   body: {
    //     message: 'Accion de crear',
    //     payload,
    //   },
    // };
    const newProduct = this.productsService.create(payload);

    return {
      body: {
        data: newProduct,
      },
    };
  }

  @Put('/:productId')
  // Indicamos que vamos a recibir data en el body y un parametro llamado productId (Lo convertimos en numerico gracias al pipe ParseIntPipe)
  editProduct(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() payload: UpdateProductDto,
  ) {
    // return {
    //   body: {
    //     message: 'Accion de editar',
    //     id: productId,
    //     payload,
    //   },
    // };
    const product = this.productsService.update(productId, payload);

    return {
      body: {
        data: product,
      },
    };
  }

  @Delete('/:productId')
  // Indicamos que vamos a recibir un parametro llamada productId (Lo convertimos en numerico gracias al pipe ParseIntPipe)
  deleteProduct(@Param('productId', ParseIntPipe) productId: number) {
    // return {
    //   body: {
    //     message: 'Accion de eliminar',
    //     id: productId,
    //   },
    // };

    try {
      const product = this.productsService.delete(productId);

      return {
        body: {
          data: product,
        },
      };
    } catch (error) {
      return error;
    }
  }
}
