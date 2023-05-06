// Funciones de los DTOs:

// - Proteger los datos
// - Validar y tipar datos
// - Evita hacer referencia a datos que no existan

// - Nest recomienda crear los DTOs con classes y no con interfaces
// - No olvidar el ValidationPipe en el main.ts

// Importando class validator para validar los datos con decoradores
import { IsString, IsNotEmpty, IsPhoneNumber } from 'class-validator';
// Mapped Types nos ayuda a reutilizar codigo (Es caso de querer documentar, importar de swagger y no de mapped-types)
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Name of customer' })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Last name of customer' })
  readonly lastName: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'Phone of customer' })
  readonly phone: string;
}

// PartialType toma nuestro DTO base y crea un nuevo DTO agregando las validaciones y el signo ? a todas las propiedades
export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
