import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindOptionsWhere, Repository, In } from 'typeorm';

// Importando la clase (interface) Product
import { Product } from '../entities/product.entity';
// Importando la clase (interface) Category
import { Category } from '../entities/category.entity';
// Importando la clase (interface) Brand
import { Brand } from '../entities/brand.entity';

// Importando el DTO (Data Transfer Object)
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';

// Importando la clase generica de servicios
import { GenericService } from '../../../common/generic.service';
// Importando servicio de brands
import { BrandsService } from '../../products/service/brands.service';

@Injectable() // Indicamos que la clase puede ser inyectada en otros lugares
export class ProductsService {
  constructor(
    // Inyectando dependencias (Se crea automaticamente una instancia de la clase BrandsService y se inyecta en el constructor)
    private brandsService: BrandsService,
    // Inyectando el repositorio de la entidad Product
    @InjectRepository(Product) private productRepository: Repository<Product>,
    // Inyectando el repositorio de la entidad Category
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    // Inyectando el repositorio de la entidad Brand
    @InjectRepository(Brand) private brandRepository: Repository<Brand>,
  ) {
    // Debemos pasarle el repositorio de la entidad al constructor de la clase padre
    // super(productRepository);
  }

  // Método para obtener todos los productos
  async findAll() {
    const products = await this.productRepository.find(
      // Indicando que resuelva las relaciones que tenga la tabla (brand viene de la entidad product)
      { relations: ['brand', 'categories'] },
    );

    if (products.length === 0) {
      throw new HttpException(`There aren't any product`, HttpStatus.NOT_FOUND);
    }

    return products;
  }

  // findAll() {
  //   const products = new Promise((resolve, reject) => {
  //     this.productRepository
  //       .find()
  //       .then((products) => {
  //         resolve(products);
  //       })
  //       .catch((error) => {
  //         reject(error);
  //       });
  //   });

  //   return products;
  // }

  // Método para obtener un producto por id
  async findOne(id: number) {
    const product = await this.productRepository.findOne(
      // Filtrando por id
      {
        where: {
          id,
        },
        // Indicando que resuelva las relaciones que tenga la tabla (brand viene de la entidad product y categories de la entidad product)
        relations: ['brand', 'categories'],
      },
    );

    if (!product) {
      throw new HttpException(`Product #${id} not found`, HttpStatus.NOT_FOUND);
    }

    return product;
  }

  // Método para crear un producto
  async create(payload: CreateProductDto) {
    const newProduct = this.productRepository.create(payload);

    if (payload.brandId) {
      const brand = await this.brandRepository.findOneBy({
        id: payload.brandId,
      });
      newProduct.brand = brand;
    }

    if (payload.categoriesId) {
      // Buscamos las categorias por id, segun el payload que nos llega
      const categories = await this.categoryRepository.findBy({
        id: In(payload.categoriesId),
      });
      newProduct.categories = categories;
    }

    return this.productRepository.save(newProduct);
  }

  // Método para editar un producto
  async update(id: number, payload: UpdateProductDto) {
    // Buscamos el producto por id
    const product = await this.findOne(id);

    if (payload.brandId) {
      const brand = await this.brandsService.findOne(payload.brandId);
      product.brand = brand;
    }

    // Si existe el producto
    if (product) {
      // Actualizamos los nuevos datos en base al producto encontrado
      this.productRepository.merge(product, payload);
      return this.productRepository.save(product);
    }
  }

  // Método para eliminar un producto
  async delete(id: number) {
    // Buscamos el producto por id
    const product = await this.findOne(id);

    // Si existe el producto
    if (product) {
      // Eliminamos el producto
      return this.productRepository.delete(id);
    }
  }
}
