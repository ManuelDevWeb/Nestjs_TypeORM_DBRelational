import {
  Controller,
  Get,
  Post,
  Query,
  Param,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  Res,
  Body,
} from '@nestjs/common';
// Importando Pipe pesonalizado
import { ParseIntPipe } from '../../../common/parse-int/parse-int.pipe';
// Importando DTO (Data Transfer Object)
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dtos';

// Importando response para manipular la res con express
import { Response } from 'express';

// Imporando el servicio de users
import { UsersService } from '../service/users.service';

// Los decoradores indican como se va a comportar la clase o el metodo

@Controller('users')
export class UsersController {
  constructor(
    // Inyectando dependencias (Se crea automaticamente una instancia de la clase UsersService y se inyecta en el constructor)
    private usersService: UsersService,
  ) {}

  @Get('/')
  // Indicamos que vamos a tener un HttpCode y enviamos un parametro del objeto HttpStatus
  @HttpCode(HttpStatus.OK)
  // Indicamos que vamos a recibir parametros de tipo query
  getUsers(@Query('limit') limit = 100, @Query('offset') offset = 50) {
    try {
      const users = this.usersService.findAll();

      return {
        body: {
          data: users,
          pagination: {
            limit,
            offset,
          },
        },
      };
    } catch (error) {
      return error;
    }
  }

  @Get('/:userId')
  // Indicamos que vamos a recibir un parámetro llamado userId (Lo convertimos en numerico gracias al pipe ParseIntPipe) y accediendo al responde de tipo Response Express
  getUser(@Res() res: Response, @Param('userId', ParseIntPipe) userId: number) {
    try {
      const user = this.usersService.findOne(userId);

      res.status(HttpStatus.OK).send({
        body: {
          data: user,
        },
      });
    } catch (error) {
      res.send(error);
    }
  }

  @Get('/:userId/orders')
  // Indicamos que vamos a recibir un parámetro llamado userId (Lo convertimos en numerico gracias al pipe ParseIntPipe)
  getOrder(@Param('userId', ParseIntPipe) userId: number) {
    try {
      return this.usersService.getOrdersByUser(userId);
    } catch (error) {
      return error;
    }
  }

  @Post('/')
  @HttpCode(HttpStatus.OK)
  // Indicamos que vamos a recibir data en el body
  createUser(@Body() payload: CreateUserDto) {
    try {
      const newUser = this.usersService.create(payload);

      return {
        body: {
          data: newUser,
        },
      };
    } catch (error) {
      return error;
    }
  }

  @Put('/:userId')
  @HttpCode(HttpStatus.OK)
  // Indicamos que vamos a recibir data en el body y un parametro llamado userId (Lo convertimos en numerico gracias al pipe ParseIntPipe)
  editUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() payload: UpdateUserDto,
  ) {
    try {
      const userEdited = this.usersService.update(userId, payload);

      return {
        body: {
          data: userEdited,
        },
      };
    } catch (error) {
      return error;
    }
  }

  @Delete('/:userId')
  @HttpCode(HttpStatus.OK)
  // Indicamos que vamos a recibir un parametro llamado userId (Lo convertimos en numero gracias al pipe ParseIntPipe)
  deleteUser(@Param('userId', ParseIntPipe) userId: number) {
    try {
      const userDeleted = this.usersService.delete(userId);

      return {
        body: {
          data: userDeleted,
        },
      };
    } catch (error) {
      return error;
    }
  }
}
