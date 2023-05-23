import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Importando la clase (interface) Order
import { Order } from '../entities/order.entity';
import { Customer } from '../entities/customer.entity';

// Importando el DTO (Data Transfer Object)
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';

@Injectable() // Indicamos que la clase puede ser inyectada en otros lugares
export class OrdersService {
  constructor(
    // Inyectando el repositorio de la entidad Order
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    // Inyectando el repositorio de la entidad Customer
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  // Metodo para obtener todas las ordenes
  async findAll() {
    const orders = await this.orderRepository.find();

    if (orders.length === 0) {
      throw new HttpException('No orders found', HttpStatus.NOT_FOUND);
    }

    return orders;
  }

  // Metodo para obtener una orden
  async findOne(id: number) {
    const order = await this.orderRepository.findOne({
      where: { id },
      // De item me trae la relacion a product
      relations: ['items', 'items.product'],
    });

    if (!order) {
      throw new HttpException(
        `Order with id ${id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      );
    }

    return order;
  }

  // Metodo para crear una orden
  async create(payload: CreateOrderDto) {
    const newOrder = new Order();

    if (payload.customerId) {
      const customer = await this.customerRepository.findOneBy({
        id: payload.customerId,
      });
      newOrder.customer = customer;
    }

    return this.orderRepository.save(newOrder);
  }

  // Metodo para actualizar una orden
  async update(id: number, payload: UpdateOrderDto) {
    const order = await this.orderRepository.findOneBy({ id });

    if (payload.customerId) {
      const customer = await this.customerRepository.findOneBy({
        id: payload.customerId,
      });
      order.customer = customer;
    }

    return this.orderRepository.save(order);
  }

  // Metodo para eliminar una orden
  async delete(id: number) {
    return await this.orderRepository.delete(id);
  }
}
