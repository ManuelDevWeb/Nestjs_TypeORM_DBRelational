// Funciones de los DTOs:

// - Proteger los datos
// - Validar y tipar datos
// - Evita hacer referencia a datos que no existan

// - Nest recomienda crear los DTOs con classes y no con interfaces
// - No olvidar el ValidationPipe en el main.ts

// Importando class validator para validar los datos con decoradores
import { IsNotEmpty, IsNumber } from 'class-validator';
// Mapped types nos ayuda a reutilizar codigo (Es caso de querer documentar, importar de swagger y no de mapped-types)
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateOrderItemDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'Id of order' })
  readonly orderId: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'Id of product' })
  readonly productId: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'Quantity of product' })
  readonly quantity: number;
}

// PartialType toma nuestro DTO base y crea un nuevo DTO agregando las validaciones y el signo ? a todas las propiedades
export class UpdateOrderItemDto extends PartialType(CreateOrderItemDto) {}
