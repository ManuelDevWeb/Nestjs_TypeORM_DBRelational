import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Importando la clase (interface) Order item
import { OrderItem } from '../entities/order-item.entity';
import { Order } from '../entities/order.entity';
import { Product } from '../../products/entities/product.entity';

// Importando el DTO (Data Transfer Object)
import { CreateOrderItemDto, UpdateOrderItemDto } from '../dtos/order-item.dto';

@Injectable()
export class OrderItemService {
  constructor(
    // Inyectando el repositorio de la entidad Order item
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    // Inyectando el repositorio de la entidad Order
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    // Inyectando el repositorio de la entidad Product
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  // Metodo para crear un order item
  async create(payload: CreateOrderItemDto) {
    // Creamos el nuevo order item
    const newOrderItem = new OrderItem();

    // Buscamos la orden
    const order = await this.orderRepository.findOneBy({
      id: payload.orderId,
    });

    // Buscamos el producto
    const product = await this.productRepository.findOneBy({
      id: payload.productId,
    });

    // Asignamos los valores al nuevo order item
    newOrderItem.order = order;
    newOrderItem.product = product;
    newOrderItem.quantity = payload.quantity;

    // Guardamos el nuevo order item
    return this.orderItemRepository.save(newOrderItem);
  }

  // Metodo para actualizar un order item
  async update(id: number, payload: UpdateOrderItemDto) {}
}
