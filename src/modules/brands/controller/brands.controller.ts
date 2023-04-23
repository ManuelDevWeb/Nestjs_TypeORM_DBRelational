import {
  Controller,
  HttpCode,
  HttpStatus,
  Query,
  Get,
  Post,
  Put,
  Delete,
  Res,
  Body,
  Param,
} from '@nestjs/common';
// Importando Pipe pesonalizado
import { ParseIntPipe } from '../../../common/parse-int/parse-int.pipe';
// Importando DTO (Data Transfer Object)
import { CreateBrandDto, UpdateBrandDto } from '../../../dtos/brands.dtos';

// Importando response para manipular la res con express
import { Response } from 'express';

// Los decoradores indican como se va a comportar la clase o el metodo

@Controller('brands')
export class BrandsController {
  @Get('/')
  // Indicamos que vamos a tener un HttpCode y enviamos un parametro del obketo HttpStatus
  @HttpCode(HttpStatus.OK)
  // Indicamos que vamos a recibir parametros de tipo query
  getBrands(@Query('limit') limit = 100, @Query('offset') offset = 50) {
    try {
      return 'get brands';
    } catch (error) {
      return error;
    }
  }

  @Get('/:brandId')
  // Indicamos que vamos a recibir un parámetro llamado brandId (Lo convertimos en numerico gracias al pipe ParseIntPipe) y accediendo al responde de tipo Response Express
  getBrand(
    @Res() res: Response,
    @Param('brandId', ParseIntPipe) brandId: number,
  ) {
    try {
      res.status(HttpStatus.OK).send('One brand');
    } catch (error) {
      res.send(error);
    }
  }

  @Post('')
  @HttpCode(HttpStatus.OK)
  // Indicamos que vamos a recibir data en el body
  createBrand(@Body() payload: CreateBrandDto) {
    try {
      return 'Create brand';
    } catch (error) {
      return error;
    }
  }

  @Put('/:brandId')
  @HttpCode(HttpStatus.OK)
  // Indicamos que vamos a recibir data en el body y un parametro llamado brandId (Lo convertimos en numerico gracias al pipe ParseIntPipe)
  editBrand(
    @Param('brandId', ParseIntPipe) brandId: number,
    @Body() payload: UpdateBrandDto,
  ) {
    try {
      return 'Edit brand';
    } catch (error) {
      return error;
    }
  }

  @Delete('/:brandId')
  @HttpCode(HttpStatus.OK)
  // Indicamos que vamos a recibir un parametro llamado brandId (Lo convertimos en numero gracias al pipe ParseIntPipe)
  deleteBrand(@Param('brandId', ParseIntPipe) brandId: number) {
    try {
      return 'delete brand';
    } catch (error) {
      return error;
    }
  }
}
