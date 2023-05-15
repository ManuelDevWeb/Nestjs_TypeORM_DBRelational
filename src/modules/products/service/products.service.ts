import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindOptionsWhere, Repository } from 'typeorm';

// Importando la clase (interface) Product
import { Product } from '../entities/product.entity';

// Importando el DTO (Data Transfer Object)
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';

// Importando la clase generica de servicios
import { GenericService } from '../../../common/generic.service';

@Injectable() // Indicamos que la clase puede ser inyectada en otros lugares
export class ProductsService extends GenericService<
  Product,
  number,
  CreateProductDto,
  UpdateProductDto
> {
  constructor(
    // Inyectando el repositorio de la entidad Product
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {
    // Debemos pasarle el repositorio de la entidad al constructor de la clase padre
    super(productRepository);
  }

  // // Método para obtener todos los productos
  // async findAll() {
  //   const products = await this.productRepository.find();

  //   if (products.length === 0) {
  //     throw new HttpException(`There aren't any product`, HttpStatus.NOT_FOUND);
  //   }
  // }

  // // findAll() {
  // //   const products = new Promise((resolve, reject) => {
  // //     this.productRepository
  // //       .find()
  // //       .then((products) => {
  // //         resolve(products);
  // //       })
  // //       .catch((error) => {
  // //         reject(error);
  // //       });
  // //   });

  // //   return products;
  // // }

  // // Método para obtener un producto por id
  // async findOne(id: number) {
  //   const product = await this.productRepository.findOne({ where: { id } });

  //   if (!product) {
  //     throw new HttpException(`Product #${id} not found`, HttpStatus.NOT_FOUND);
  //   }

  //   return product;
  // }

  // // Método para crear un producto
  // create(payload: CreateProductDto) {
  //   const newProduct = this.productRepository.create(payload);
  //   return this.productRepository.save(newProduct);
  // }

  // // Método para editar un producto
  // async update(id: number, payload: UpdateProductDto) {
  //   // Buscamos el producto por id
  //   const product = await this.findOne(id);

  //   // Si existe el producto
  //   if (product) {
  //     // Actualizamos los nuevos datos en base al producto encontrado
  //     this.productRepository.merge(product, payload);
  //     return this.productRepository.save(product);
  //   }
  // }

  // // Método para eliminar un producto
  // async delete(id: number) {
  //   // Buscamos el producto por id
  //   const product = await this.findOne(id);

  //   // Si existe el producto
  //   if (product) {
  //     // Eliminamos el producto
  //     return this.productRepository.delete(id);
  //   }
  // }
}
