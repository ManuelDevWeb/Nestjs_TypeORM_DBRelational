import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

// Importando la clase (interface) Customer
import { Customer } from '../entities/customer.entity';

// Importando DTO (Data Transfer Object)
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customers.dto';

@Injectable() // Indicamos que la clase puede ser inyectada en otros lugares
export class CustomersService {
  private counter = 1;

  // Array privado de customers, solo accesible desde la clase
  private customers: Customer[] = [
    {
      id: 1,
      name: 'Manuel',
      lastName: 'Valencia',
      phone: '+57 3165477012',
    },
  ];

  // Metodo para obtener todos los customers
  findAll() {
    const customers = this.customers;

    if (customers.length === 0) {
      throw new HttpException(
        `There aren't any customers`,
        HttpStatus.NOT_FOUND,
      );
    }

    return customers;
  }

  // Metodo para obtener un customer
  findOne(id: number) {
    const customer = this.customers.find((item) => item.id === id);

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
    this.counter++;

    const newCustomer = {
      id: this.counter,
      ...payload,
    };

    this.customers.push(newCustomer);

    return newCustomer;
  }

  // Metodo para actualizar un customer
  update(id: number, payload: UpdateCustomerDto) {
    const customer = this.findOne(id);

    if (customer) {
      // Obtenemos el indice del elemento
      const index = this.customers.findIndex((item) => item.id === id);

      this.customers[index] = {
        ...customer,
        ...payload,
      };

      return this.customers[index];
    }
  }

  // Metodo para eliminar un customer
  delete(id: number) {
    const customer = this.findOne(id);

    if (customer) {
      // Obtenemos el indice del elemento
      const index = this.customers.findIndex((item) => item.id === id);

      this.customers.splice(index, 1);

      return true;
    }
  }
}
