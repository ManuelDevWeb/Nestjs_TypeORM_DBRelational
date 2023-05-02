import {
  Controller,
  Get,
  Post,
  Query,
  Param,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  Res,
  Body,
} from '@nestjs/common';
// Importando Pipe pesonalizado
import { ParseIntPipe } from '../../../common/parse-int/parse-int.pipe';
// Importando DTO (Data Transfer Object)
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customers.dto';

// Importando response para manipular la res con express
import { Response } from 'express';
// Permite agrupar los endpoints para que sea mas legible su documentacion
import { ApiTags } from '@nestjs/swagger';

// Imporando el servicio de customers
import { CustomersService } from '../service/customers.service';

// Los decoradores indican como se va a comportar la clase o el metodo

@ApiTags('Customers')
@Controller('customers')
export class CustomersController {
  constructor(
    // Inyectando dependencias (Se crea automaticamente una instancia de la clase CustomersService y se inyecta en el constructor)
    private customersService: CustomersService,
  ) {}

  @Get('/')
  // Indicamos que vamos a tener un HttpCode y enviamos un parametro del objeto HttpStatus
  @HttpCode(HttpStatus.OK)
  // Indicamos que vamos a recibir parametros de tipo query
  getCustomers(@Query('limit') limit = 100, @Query('offset') offset = 50) {
    try {
      const customers = this.customersService.findAll();

      return {
        body: {
          data: customers,
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

  @Get('/:customerId')
  // Indicamos que vamos a recibir un parámetro llamado customerId (Lo convertimos en numerico gracias al pipe ParseIntPipe) y accediendo al responde de tipo Response Express
  getCustomer(
    @Res() res: Response,
    @Param('customerId', ParseIntPipe) customerId: number,
  ) {
    try {
      const customer = this.customersService.findOne(customerId);

      res.status(HttpStatus.OK).send({
        body: {
          data: customer,
        },
      });
    } catch (error) {
      res.send(error);
    }
  }

  @Post('/')
  @HttpCode(HttpStatus.OK)
  // Indicamos que vamos a recibir data en el body
  createCustomer(@Body() payload: CreateCustomerDto) {
    try {
      const newCustomer = this.customersService.create(payload);

      return {
        body: {
          data: newCustomer,
        },
      };
    } catch (error) {
      return error;
    }
  }

  @Put('/:customerId')
  @HttpCode(HttpStatus.OK)
  // Indicamos que vamos a recibir data en el body y un parametro llamado customerId (Lo convertimos en numerico gracias al pipe ParseIntPipe)
  editCustomer(
    @Param('customerId', ParseIntPipe) customerId: number,
    @Body() payload: UpdateCustomerDto,
  ) {
    try {
      const customerEdited = this.customersService.update(customerId, payload);

      return {
        body: {
          data: customerEdited,
        },
      };
    } catch (error) {
      return error;
    }
  }

  @Delete('/:customerId')
  @HttpCode(HttpStatus.OK)
  // Indicamos que vamos a recibir un parametro llamado customerId (Lo convertimos en numero gracias al pipe ParseIntPipe)
  deleteCustomer(@Param('customerId', ParseIntPipe) customerId: number) {
    try {
      const customerDeleted = this.customersService.delete(customerId);

      return {
        body: {
          data: customerDeleted,
        },
      };
    } catch (error) {
      return error;
    }
  }
}
