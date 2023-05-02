// Funciones de los DTOs:

// - Proteger los datos
// - Validar y tipar datos
// - Evita hacer referencia a datos que no existan

// - Nest recomienda crear los DTOs con classes y no con interfaces
// - No olvidar el ValidationPipe en el main.ts

// Importando class validator para validar los datos con decoradores
import { IsString, IsNotEmpty } from 'class-validator';
// Mapped Types nos ayuda a reutilizar codigo. (Es caso de querer documentar, importar de swagger y no de mapped-types)
// PartialType toma nuestro DTO base y crea un nuevo DTO agregando las validaciones y el signo ? a cada propiedad
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  // Solo de lectura
  @IsString({ message: 'The name must be a string' })
  @IsNotEmpty()
  @ApiProperty({ description: 'Name of category' })
  readonly name: string;
}
// PartialType toma nuestro DTO base y crea un nuevo DTO agregando las validaciones y el signo ? a cada propiedad
export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
