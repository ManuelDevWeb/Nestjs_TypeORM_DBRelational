import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

// Importando la clase (interface) Product
import { Product } from '../entity/product.entity';

// Importando el DTO (Data Transfer Object)
import {
  CreateProductDto,
  UpdateProductDto,
} from '../../../dtos/products.dtos';

@Injectable() // Indicamos que la clase puede ser inyectada en otros lugares
export class ProductsService {
  private counter = 1;

  // Array privado de productos, solo accesible desde la clase
  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Description 1',
      price: 100,
      stock: 10,
      image: 'https://picsum.photos/200',
    },
  ];

  // Método para obtener todos los productos
  findAll() {
    return this.products;
  }

  // Método para obtener un producto por id
  findOne(id: number) {
    const product = this.products.find((item) => item.id === id);

    if (!product) {
      throw new HttpException(`Product #${id} not found`, HttpStatus.NOT_FOUND);
    }

    return product;
  }

  // Método para crear un producto
  create(payload: CreateProductDto) {
    // Incrementamos el contador
    this.counter++;

    const newProduct: Product = {
      id: this.counter,
      ...payload,
    };

    this.products.push(newProduct);

    return newProduct;
  }

  // Método para editar un producto
  update(id: number, payload: UpdateProductDto) {
    // Buscamos el producto por id
    const product = this.findOne(id);

    // Si existe el producto
    if (product) {
      // Obtenemos el indice del producto
      const index = this.products.findIndex((item) => item.id === id);

      this.products[index] = {
        ...product,
        ...payload,
      };

      return this.products[index];
    }
  }

  // Método para eliminar un producto
  delete(id: number) {
    // Buscamos el producto por id
    const product = this.findOne(id);

    // Si existe el producto
    if (product) {
      // Obtenemos el indice del producto
      const index = this.products.findIndex((item) => item.id === id);

      // Eliminamos el producto
      this.products.splice(index, 1);

      return true;
    }
  }
}
