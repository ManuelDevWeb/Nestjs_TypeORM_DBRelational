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
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brands.dtos';

// Importando response para manipular la res con express
import { Response } from 'express';

// Importando el servicio de brands
import { BrandsService } from '../service/brands.service';

// Los decoradores indican como se va a comportar la clase o el metodo

@Controller('brands')
export class BrandsController {
  constructor(
    // Inyectado dependencias (Se crea automaticamente una instancia de la clase BrandsService y se inyecta en el constructor)
    private brandsService: BrandsService,
  ) {}

  @Get('/')
  // Indicamos que vamos a tener un HttpCode y enviamos un parametro del obketo HttpStatus
  @HttpCode(HttpStatus.OK)
  // Indicamos que vamos a recibir parametros de tipo query
  getBrands(@Query('limit') limit = 100, @Query('offset') offset = 50) {
    try {
      const brands = this.brandsService.findAll();

      return {
        body: {
          data: brands,
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

  @Get('/:brandId')
  // Indicamos que vamos a recibir un parámetro llamado brandId (Lo convertimos en numerico gracias al pipe ParseIntPipe) y accediendo al responde de tipo Response Express
  getBrand(
    @Res() res: Response,
    @Param('brandId', ParseIntPipe) brandId: number,
  ) {
    try {
      const brand = this.brandsService.findOne(brandId);

      res.status(HttpStatus.OK).send({
        body: {
          data: brand,
        },
      });
    } catch (error) {
      res.send(error);
    }
  }

  @Post('')
  @HttpCode(HttpStatus.OK)
  // Indicamos que vamos a recibir data en el body
  createBrand(@Body() payload: CreateBrandDto) {
    try {
      const newBrand = this.brandsService.create(payload);

      return {
        body: {
          data: newBrand,
        },
      };
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
      const brandUpdated = this.brandsService.update(brandId, payload);

      return {
        body: {
          data: brandUpdated,
        },
      };
    } catch (error) {
      return error;
    }
  }

  @Delete('/:brandId')
  @HttpCode(HttpStatus.OK)
  // Indicamos que vamos a recibir un parametro llamado brandId (Lo convertimos en numero gracias al pipe ParseIntPipe)
  deleteBrand(@Param('brandId', ParseIntPipe) brandId: number) {
    try {
      const brandDeleted = this.brandsService.delete(brandId);

      return {
        body: {
          data: brandDeleted,
        },
      };
    } catch (error) {
      return error;
    }
  }
}
