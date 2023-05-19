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
  IsArray,
  ArrayMinSize,
} from 'class-validator';
// Mapped Types nos ayuda a reutilizar codigo (Es caso de querer documentar, importar de swagger y no de mapped-types)
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  // Solo de lectura
  @IsString({ message: 'The name must be a string' })
  @IsNotEmpty()
  @ApiProperty({ description: 'Name of product' })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Description of product' })
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: 'Price of product' })
  readonly price: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: 'Stock of product' })
  readonly stock: number;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({ description: 'Image of product' })
  readonly image: string;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ description: 'Id of brand' })
  // Tener en cuenta quien carga con la referencia
  readonly brandId: number;

  @IsArray()
  @ArrayMinSize(1)
  @IsNumber({}, { each: true })
  @IsNotEmpty()
  @ApiProperty({ description: 'Id of category' })
  readonly categoriesId: number[];
}

// PartialType toma nuestro DTO base y crea un nuevo DTO agregando las validaciones y el signo ? a cada propiedad
export class UpdateProductDto extends PartialType(CreateProductDto) {}
