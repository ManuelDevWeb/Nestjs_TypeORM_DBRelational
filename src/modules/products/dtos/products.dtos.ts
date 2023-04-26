// Funciones de los DTOs:

// - Proteger los datos
// - Validar y tipar datos
// - Evita hacer referencia a datos que no existan

// - Nest recomienda crear los DTOs con classes y no con interfaces
// - No olvidar el ValidationPipe en el main.ts

// Importando class validator para validar los datos con decoradores
import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
} from 'class-validator';
// Mapped Types nos ayuda a reutilizar codigo.
// PartialType toma nuestro DTO base y crea un nuevo DTO agregando las validaciones y el signo ? a cada propiedad
import { PartialType } from '@nestjs/mapped-types';

export class CreateProductDto {
  // Solo de lectura
  @IsString({ message: 'The name must be a string' })
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly price: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly stock: number;

  @IsUrl()
  @IsNotEmpty()
  readonly image: string;
}

// PartialType toma nuestro DTO base y crea un nuevo DTO agregando las validaciones y el signo ? a cada propiedad
export class UpdateProductDto extends PartialType(CreateProductDto) {}
