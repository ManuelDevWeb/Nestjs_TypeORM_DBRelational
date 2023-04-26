import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

// Importando la clase (interface) Brand
import { Brand } from '../entity/brand.entity';

// Importando el DTO (Data Transfer Object)
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brands.dtos';

@Injectable() // Indicamos que la clase puede ser inyectada en otros lugares
export class BrandsService {
  private counter = 1;

  // Array privado de brands, solo accesible desde la clase
  private brands: Brand[] = [
    {
      id: 1,
      name: 'Brand 1',
      imagen: 'google.com',
    },
  ];

  // Metodo para obtener todas las brands
  findAll() {
    const brands = this.brands;

    if (brands.length === 0) {
      throw new HttpException(`There aren't any brand`, HttpStatus.NOT_FOUND);
    }

    return brands;
  }

  // Metodo para obtener brand por id
  findOne(id: number) {
    const brand = this.brands.find((item) => item.id === id);

    if (!brand) {
      throw new HttpException(
        `Element with ${id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      );
    }

    return brand;
  }

  // Metodo para crear una brand
  create(payload: CreateBrandDto) {
    this.counter++;

    const newBrand: Brand = {
      id: this.counter,
      ...payload,
    };

    this.brands.push(newBrand);

    return newBrand;
  }

  // Metodo para editar una brand
  update(id: number, payload: UpdateBrandDto) {
    const brand = this.findOne(id);

    if (brand) {
      // Obtenemos el indice del elemento
      const index = this.brands.findIndex((item) => item.id === id);

      this.brands[index] = {
        ...brand,
        ...payload,
      };

      return this.brands[index];
    }
  }

  // Metodo para eliminar una brand
  delete(id: number) {
    const brand = this.findOne(id);

    if (brand) {
      // Obtenemos el indice del elemento
      const index = this.brands.findIndex((item) => item.id === id);

      // Eliminamos la brand
      this.brands.splice(index, 1);

      return true;
    }
  }
}
