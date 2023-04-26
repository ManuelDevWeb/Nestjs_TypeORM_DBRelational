import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

// Importando la clase (interface) Category
import { Category } from '../entity/category.entity';

// Importando el DTO (Data Transfer Object)
import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from '../dtos/categories.dtos';

@Injectable() // Indicamos que la clase puede ser inyectada en otros lugares
export class CategoriesService {
  private counter = 1;

  // Array privado de categorias, solo accesible desde la clase
  private categories: Category[] = [
    {
      id: 1,
      name: 'Category 1',
    },
  ];

  // Metodo para obtener todas las categorias
  findAll() {
    const categories = this.categories;

    if (categories.length === 0) {
      throw new HttpException(
        `There aren't any category`,
        HttpStatus.NOT_FOUND,
      );
    }

    return categories;
  }

  // Metodo para obtener categoria por id
  findOne(id: number) {
    const category = this.categories.find((item) => item.id === id);

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
    // Incrementamos el contador
    this.counter++;

    const newCategory: Category = {
      id: this.counter,
      ...payload,
    };

    this.categories.push(newCategory);

    return newCategory;
  }

  // Metodo para editar una categoria
  update(id: number, payload: UpdateCategoryDto) {
    // Buscamos la categoria por id
    const category = this.findOne(id);

    if (category) {
      // Obtenemos el indice de la categoria
      const index = this.categories.findIndex((item) => item.id === id);

      this.categories[index] = {
        ...category,
        ...payload,
      };

      return this.categories[index];
    }
  }

  // Metodo para eliminar una categoria
  delete(id: number) {
    // Buscamos la categoria por id
    const category = this.findOne(id);

    if (category) {
      // Obtenemos el indice de la categoria
      const index = this.categories.findIndex((item) => item.id === id);

      // Eliminamos la categoria
      this.categories.splice(index, 1);

      return true;
    }
  }
}
