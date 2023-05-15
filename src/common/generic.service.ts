import { HttpException, HttpStatus } from '@nestjs/common';
import { Repository, DeepPartial, FindOptionsWhere, Between } from 'typeorm';

// ENTITY: Representa la entidad del servicio
// ID: Representa el tipo del Primary Key del Repositorio (no siempre es un number, por eso lo coloco como dinámico)
// DTO: Representa la clase del DTO (necesaria para recibir los datos desde el body)
// PARTIAL_DTO: Representa la misma clase del DTO pero con sus atributos como opcionales

export class GenericService<
  ENTITY extends object,
  ID,
  DTO extends object,
  PARTIAL_DTO extends DeepPartial<ENTITY>,
> {
  constructor(private readonly genericRepository) {}

  async findAll(): Promise<ENTITY[]> {
    const data = await this.genericRepository.find();

    if (data.length === 0) {
      throw new HttpException(`There aren't any data`, HttpStatus.NOT_FOUND);
    }

    return data;
  }

  async findOne(id: ID): Promise<ENTITY> {
    const data = await this.genericRepository.findOneBy(id);

    if (!data) {
      throw new HttpException(`Data #${id} not found`, HttpStatus.NOT_FOUND);
    }

    return data;
  }

  async create(payload: DTO) {
    const newData = this.genericRepository.create(payload);
    return await this.genericRepository.save(newData);
  }

  async update(id: ID, payload: PARTIAL_DTO) {
    const data = await this.findOne(id);

    if (data) {
      this.genericRepository.merge(data, payload);
      return await this.genericRepository.save(data);
    }
  }

  async delete(id: ID): Promise<boolean> {
    const data = await this.findOne(id);

    if (data) {
      const deleted = await this.genericRepository.delete(id);
      return deleted ? true : false;
    }
  }
}
