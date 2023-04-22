import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    const val = parseInt(value, 10);

    // Si no puede convertir el valor a un numero, entonces retornamos error
    if (isNaN(val)) {
      throw new HttpException(
        `${value} is not a number`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return val;
  }
}
