import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Repository } from 'typeorm';

// Importando la clase (interface) Category
import { Category } from '../entities/category.entity';

// Importando el DTO (Data Transfer Object)
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/categories.dto';

@Injectable() // Indicamos que la clase puede ser inyectada en otros lugares
export class CategoriesService {
  constructor(
    // Inyectando el repositorio de la entidad Category
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  // Metodo para obtener todas las categorias
  async findAll() {
    const categories = await this.categoryRepository.find();

    if (categories.length === 0) {
      throw new HttpException(
        `There aren't any category`,
        HttpStatus.NOT_FOUND,
      );
    }

    return categories;
  }

  // Metodo para obtener categoria por id
  async findOne(id: number) {
    const category = await this.categoryRepository.findOne(id);

    if (!category) {
      throw new HttpException(
        `Category #${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    return category;
  }

  // Metodo para crear una categoria
  create(payload: CreateCategoryDto) {
    const newCategory = this.categoryRepository.create(payload);

    return this.categoryRepository.save(newCategory);
  }

  // Metodo para editar una categoria
  async update(id: number, payload: UpdateCategoryDto) {
    // Buscamos la categoria por id
    const category = await this.findOne(id);

    if (category) {
      // Actualizamos los nuevos datos en base a la categoria encontrada
      this.categoryRepository.merge(category, payload);
      return this.categoryRepository.save(category);
    }
  }

  // Metodo para eliminar una categoria
  async delete(id: number) {
    // Buscamos la categoria por id
    const category = await this.findOne(id);

    if (category) {
      // Eliminamos la categoria
      return this.categoryRepository.delete(id);
    }
  }
}
