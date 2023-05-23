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
  Body,
} from '@nestjs/common';
// Importando Pipe pesonalizado
import { ParseIntPipe } from '../../../common/parse-int/parse-int.pipe';
// Importando DTO (Data Transfer Object)
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';

// Permite agrupar los endpoints para que sea mas legible su documentacion
import { ApiTags } from '@nestjs/swagger';

// Importando el servicio de orders
import { OrdersService } from '../service/orders.service';

// Los decoradores indican como se va a comportar la clase o el metodo

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(
    // Inyectando dependencias (Se crea automaticamente una instancia de la clase OrdersService y se inyecta en el constructor)
    private ordersService: OrdersService,
  ) {}

  @Get('/')
  // Indicamos que vamos a tener un HttpCode y enviamos un parametro del objeto HttpStatus
  @HttpCode(HttpStatus.OK)
  // Indicamos que vamos a recibir parametros de tipo query
  async getOrders(@Query('limit') limit = 100, @Query('offset') offset = 50) {
    try {
      const orders = await this.ordersService.findAll();

      return {
        body: {
          data: orders,
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

  @Get('/:orderId')
  // Indicamos que vamos a recibir un parametro llamado orderId (Lo convertimos a numero con el pipe personalizado)
  async getOrder(@Param('orderId', ParseIntPipe) orderId: number) {
    try {
      const order = await this.ordersService.findOne(orderId);

      return {
        body: {
          data: order,
        },
      };
    } catch (error) {
      return error;
    }
  }

  @Post('/')
  @HttpCode(HttpStatus.OK)
  // Indicamos que vamos a recibir data del body
  async createOrder(@Body() payload: CreateOrderDto) {
    try {
      const newOrder = await this.ordersService.create(payload);

      return {
        body: {
          data: newOrder,
        },
      };
    } catch (error) {
      return error;
    }
  }

  @Put('/:orderId')
  @HttpCode(HttpStatus.OK)
  // Indicamos que vamos a recibir data en el body y un parametro llamado orderId (Lo convertimos en numerico gracias al pipe ParseIntPipe)
  async updateOrder(
    @Param('orderId', ParseIntPipe) orderId: number,
    @Body() payload: UpdateOrderDto,
  ) {
    try {
      const updatedOrder = await this.ordersService.update(orderId, payload);

      return {
        body: {
          data: updatedOrder,
        },
      };
    } catch (error) {
      return error;
    }
  }

  @Delete('/:orderId')
  @HttpCode(HttpStatus.OK)
  // Indicamos que vamos a recibir un parametro llamado orderId (Lo convertimos en numerico gracias al pipe ParseIntPipe)
  async deleteOrder(@Param('orderId', ParseIntPipe) orderId: number) {
    try {
      const deletedOrder = await this.ordersService.delete(orderId);

      return {
        body: {
          data: deletedOrder,
        },
      };
    } catch (error) {
      return error;
    }
  }
}
