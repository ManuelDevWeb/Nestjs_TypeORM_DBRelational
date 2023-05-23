import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Permite instanciar un objeto con la config
import { ConfigType } from '@nestjs/config';
// Importando tipado de config
import config from '../../../config';
// Importando pg para conectarnos a la DB o obtener su tipado
import { Client } from 'pg';

// Importando la clase (interface) User y Order
import { User } from '../entities/user.entity';

// Importando el DTO (Data Transfer Object)
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';

// Importando servicio de products
import { ProductsService } from '../../products/service/products.service';
// Importando servicio de customers
import { CustomersService } from './customers.service';

@Injectable() // Indicamos que la clase puede ser inyectada en otros lugares
export class UsersService {
  constructor(
    // Inyectando dependencias (Se crea automaticamente una instancia de la clase ProductsService y se inyecta en el constructor)
    private productsService: ProductsService,
    // Inyectando dependencias (Se crea automaticamente una instancia de la clase CustomersService y se inyecta en el constructor)
    private customersService: CustomersService,
    // Inyectando dependencia (Config module)
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    // Inyectando dependencia de tipo useFactory (Conexion a la DB)
    @Inject('PG_CONNECTION') private clientPg: Client,
    // Inyectando el repositorio de la entidad User
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  // Metodo para obtener todos los usuarios
  async findAll() {
    // const apiKey = this.configService.apiKey;
    // const dbName = this.configService.database.port;
    // console.log('Api key', apiKey);
    // console.log('DB: ', dbName);

    const users = await this.userRepository.find(
      // Indicando que resuelva las relaciones que tenga la tabla (customer viene de la entidad user)
      { relations: ['customer'] },
    );

    if (users.length === 0) {
      throw new HttpException('No users found', HttpStatus.NOT_FOUND);
    }

    return users;
  }

  // Metodo para obtener un usuario
  async findOne(id: number) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new HttpException(
        `User with id ${id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }

  // Metodo para obtener las ordenes de un usuario
  async getOrdersByUser(id: number) {
    const user = this.findOne(id);

    return {
      date: new Date(),
      user,
      products: await this.productsService.findAll(),
    };
  }

  // Metodo para crear un usuario
  async create(payload: CreateUserDto) {
    const newUser = this.userRepository.create(payload);

    // Si viene el customerId, buscamos el customer
    if (payload.customerId) {
      const customer = await this.customersService.findOne(payload.customerId);
      newUser.customer = customer;
    }

    return this.userRepository.save(newUser);
  }

  // Metodo para actualizar un usuario
  async update(id: number, payload: UpdateUserDto) {
    const user = await this.findOne(id);

    if (user) {
      // Actualizamos los nuevos datos en base al usuario encontrado
      this.userRepository.merge(user, payload);
      return this.userRepository.save(user);
    }
  }

  // Metodo para eliminar un usuario
  async delete(id: number) {
    const user = await this.findOne(id);

    if (user) {
      return this.userRepository.delete(user);
    }
  }

  async getTaks(): Promise<any[]> {
    const res = await this.clientPg.query('SELECT * FROM tasks');
    return res.rows;
  }
}
