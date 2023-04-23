import {
  Controller,
  Get,
  Query,
  Param,
  Body,
  Post,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  Res,
} from '@nestjs/common';
// Importando Pipe personalizado
import { ParseIntPipe } from '../../../common/parse-int/parse-int.pipe';
// Importando DTO (Data Transfer Object)
import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from '../../../dtos/categories.dto';

// Importando response para manipular la res
import { Response } from 'express';

// Importando el servicio de categorias
import { CategoriesService } from '../service/categories.service';

// Los decoradores indican como se va a comportar la clase o el método

@Controller('categories') // Indica que la clase es un controlador
export class CategoriesController {
  constructor(
    // Inyectado dependencias (Se crea automaticamente una instancia de la clase CategoriesService y se inyecta en el constructor)
    private categoriesService: CategoriesService,
  ) {}

  @Get('/')
  // Indicamos que vamos a tener un HttpCode y enviamos un parametro del objeto HttpStatus (Tambien podriamos enviar uno personalizado -> @HttpCode(200))
  @HttpCode(HttpStatus.OK)
  // Indicamos que vamos a recibir parametros tipo query
  getCategories(@Query('limit') limit = 100, @Query('offset') offset = 50) {
    try {
      const categories = this.categoriesService.findAll();

      return {
        body: {
          data: categories,
          pagination: {
            limit,
            offset,
          },
        },
      };
    } catch (error) {
      return error;
    }
  }

  @Get('/:categoryId')
  // Indicamos que vamos a recibir un parámetro llamado categoryId (Lo convertimos en numerico gracias al pipe ParseIntPipe) y accediendo al responde de tipo Response Express
  getCategory(
    @Res() res: Response,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    try {
      const category = this.categoriesService.findOne(categoryId);

      res.status(HttpStatus.OK).send({
        body: {
          data: category,
        },
      });
    } catch (error) {
      res.send(error);
    }
  }

  @Post('')
  @HttpCode(HttpStatus.OK)
  // Indicamos que vamos a recibir data en el body
  createCategory(@Body() payload: CreateCategoryDto) {
    try {
      const newCategory = this.categoriesService.create(payload);

      return {
        body: {
          data: newCategory,
        },
      };
    } catch (error) {
      return error;
    }
  }

  @Put('/:categoryId')
  @HttpCode(HttpStatus.OK)
  // Indicamos que vamos a recibir data en el body y un parametro llamado categoryId (Lo convertimos en numerico gracias al pipe ParseIntPipe)
  editCategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Body() payload: UpdateCategoryDto,
  ) {
    try {
      const category = this.categoriesService.update(categoryId, payload);

      return {
        body: {
          data: category,
        },
      };
    } catch (error) {
      return error;
    }
  }

  @Delete('/:categoryId')
  @HttpCode(HttpStatus.OK)
  // Indicamos que vamos a recibir un parametro llamada categoryId (Lo convertimos en numerico gracias al pipe ParseIntPipe)
  deleteCategory(@Param('categoryId', ParseIntPipe) categoryId: number) {
    try {
      const category = this.categoriesService.delete(categoryId);

      return {
        body: {
          data: category,
        },
      };
    } catch (error) {
      return error;
    }
  }
}
