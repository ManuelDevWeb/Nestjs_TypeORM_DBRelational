import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Importando la clase (interface) Customer
import { Customer } from '../entities/customer.entity';

// Importando DTO (Data Transfer Object)
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customers.dto';

@Injectable() // Indicamos que la clase puede ser inyectada en otros lugares
export class CustomersService {
  constructor(
    // Inyectando el repositorio de la entidad Customer
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  // Metodo para obtener todos los customers
  async findAll() {
    const customer = await this.customerRepository.find(
      // Indicando que resuelva las relaciones que tenga la tabla (products viene de la entidad brand)
      { relations: ['products'] },
    );

    if (customer.length === 0) {
      throw new HttpException(
        `There aren't any customer`,
        HttpStatus.NOT_FOUND,
      );
    }

    return customer;
  }

  // Metodo para obtener un customer
  async findOne(id: number) {
    const customer = await this.customerRepository.findOne({ where: { id } });

    if (!customer) {
      throw new HttpException(
        `customer with id ${id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      );
    }

    return customer;
  }

  // Metodo para crear un customer
  create(payload: CreateCustomerDto) {
    const newCustomer = this.customerRepository.create(payload);
    return this.customerRepository.save(newCustomer);
  }

  // Metodo para actualizar un customer
  async update(id: number, payload: UpdateCustomerDto) {
    const customer = await this.findOne(id);

    if (customer) {
      // Actualizamos los nuevos datos en base al customer encontrado
      this.customerRepository.merge(customer, payload);
      return this.customerRepository.save(customer);
    }
  }

  // Metodo para eliminar un customer
  async delete(id: number) {
    const customer = await this.findOne(id);

    if (customer) {
      // Eliminamos el customer
      return this.customerRepository.delete(id);
    }
  }
}
