// Funciones de los DTOs:

// - Proteger los datos
// - Validar y tipar datos
// - Evita hacer referencia a datos que no existan

// - Nest recomienda crear los DTOs con classes y no con interfaces
// - No olvidar el ValidationPipe en el main.ts

// Importando class validator para validar los datos con decoradores
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';
// Mapped Types nos ayuda a reutilizar codigo.
import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly role: string;
}

// PartialType toma nuestro DTO base y crea un nuevo DTO agregando las validaciones y el signo ? a todas las propiedades
export class UpdateUserDto extends PartialType(CreateUserDto) {}
