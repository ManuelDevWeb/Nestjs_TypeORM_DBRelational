import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';

// Importando la clase (interface) User y Order
import { User } from '../entities/user.entity';
import { Order } from '../entities/order.entity';

// Importando el DTO (Data Transfer Object)
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dtos';

// Importando servicio de products
import { ProductsService } from '../../products/service/products.service';

@Injectable() // Indicamos que la clase puede ser inyectada en otros lugares
export class UsersService {
  constructor(
    // Inyectando dependencias (Se crea automaticamente una instancia de la clase ProductsService y se inyecta en el constructor)
    private productsService: ProductsService,
    // Inyectando el provider de tipo useValue
    @Inject('API_KEY') private apiKey: string,
  ) {}

  private counter = 1;

  // Array privado de users, solo accesible desde la clase
  private users: User[] = [
    {
      id: 1,
      email: 'manuel@gmail.com',
      password: '1234Ab*',
      role: 'admin',
    },
  ];

  // Metodo para obtener todos los usuarios
  findAll() {
    const users = this.users;

    if (users.length === 0) {
      throw new HttpException(`There aren't any users`, HttpStatus.NOT_FOUND);
    }

    return users;
  }

  // Metodo para obtener un usuario
  findOne(id: number) {
    const user = this.users.find((item) => item.id === id);

    if (!user) {
      throw new HttpException(
        `User with id ${id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }

  // Metodo para obtener las ordenes de un usuario
  getOrdersByUser(id: number): Order {
    const user = this.findOne(id);

    return {
      date: new Date(),
      user,
      products: this.productsService.findAll(),
    };
  }

  // Metodo para crear un usuario
  create(payload: CreateUserDto) {
    this.counter++;

    const newUser = {
      id: this.counter,
      ...payload,
    };

    this.users.push(newUser);

    return newUser;
  }

  // Metodo para actualizar un usuario
  update(id: number, payload: UpdateUserDto) {
    const user = this.findOne(id);

    if (user) {
      // Obtenemos el indice del elemento
      const index = this.users.findIndex((item) => item.id === id);

      this.users[index] = {
        ...user,
        ...payload,
      };

      return this.users[index];
    }
  }

  // Metodo para eliminar un usuario
  delete(id: number) {
    const user = this.findOne(id);

    if (user) {
      // Obtenemos el indice del elemento
      const index = this.users.findIndex((item) => item.id === id);

      this.users.splice(index, 1);

      return true;
    }
  }
}
