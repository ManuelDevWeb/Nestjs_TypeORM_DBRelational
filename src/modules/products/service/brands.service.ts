import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Importando la clase (interface) Brand
import { Brand } from '../entities/brand.entity';

// Importando el DTO (Data Transfer Object)
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brands.dto';

@Injectable() // Indicamos que la clase puede ser inyectada en otros lugares
export class BrandsService {
  constructor(
    // Inyectando el repositorio de la entidad Brand
    @InjectRepository(Brand) private brandRepository: Repository<Brand>,
  ) {}

  // Metodo para obtener todas las brands
  async findAll() {
    const brands = await this.brandRepository.find();

    if (brands.length === 0) {
      throw new HttpException(`There aren't any brand`, HttpStatus.NOT_FOUND);
    }

    return brands;
  }

  // Metodo para obtener brand por id
  async findOne(id: number) {
    const brand = await this.brandRepository.findOne({ where: { id } });

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
    const newBrand = this.brandRepository.create(payload);

    return this.brandRepository.save(newBrand);
  }

  // Metodo para editar una brand
  async update(id: number, payload: UpdateBrandDto) {
    const brand = await this.findOne(id);

    if (brand) {
      // Actualizamos los nuevos datos en base al brand encontrado
      this.brandRepository.merge(brand, payload);
      return this.brandRepository.save(brand);
    }
  }

  // Metodo para eliminar una brand
  async delete(id: number) {
    const brand = await this.findOne(id);

    if (brand) {
      // Eliminamos la brand
      return this.brandRepository.delete(id);
    }
  }
}
