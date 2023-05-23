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
// Importando Pipe personalizado
import { ParseIntPipe } from '../../../common/parse-int/parse-int.pipe';
// Importando DTOs (Data Transfer Object)
import { CreateOrderItemDto, UpdateOrderItemDto } from '../dtos/order-item.dto';

// Permite agrupar los endpoints para que sea mas legible su documentacion
import { ApiTags } from '@nestjs/swagger';

// Importando el servicio de order items
import { OrderItemService } from '../service/order-item.service';

// Los decoradores indican como se va a comportar la clase o el metodo

@ApiTags('Order Items')
@Controller('order-item')
export class OrderItemController {
  constructor(
    // Inyectando dependencias (Se crea automaticamente una instancia de la clase OrderItemsService y se inyecta en el constructor)
    private orderItemsService: OrderItemService,
  ) {}

  @Post('/')
  @HttpCode(HttpStatus.OK)
  // Indicamos que vamos a recibir data del body
  async createOrderItem(@Body() payload: CreateOrderItemDto) {
    try {
      const orderItem = await this.orderItemsService.create(payload);

      console.log('orderItem', orderItem);

      return {
        body: {
          data: orderItem,
        },
      };
    } catch (error) {
      return error;
    }
  }
}
