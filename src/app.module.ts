import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ConfigModule } from '@nestjs/config';
// Joi para validar
import * as Joi from 'joi';

// Modules
import { ProductsModule } from './modules/products/products.module';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './database/database.module';

// Environments
import { environments } from '../environments';

// Config tipado
import config from './config';

@Module({
  imports: [
    // Config Module
    ConfigModule.forRoot({
      // Archivo a leer
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      // Lo hacemos global (Con esto lo podemos inyectar en todos los modules)
      isGlobal: true,
      // Cargar tipado de la configuracion
      load: [config],
      // Validacion para los .env
      validationSchema: Joi.object({
        API_KEY: Joi.number().required,
        DATABASE_NAME: Joi.string().required,
        DATABASE_PORT: Joi.number().required,
      }),
    }),
    HttpModule,
    ProductsModule,
    UsersModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // Por defecto cuando vamos a proveer un servicio se hace de la siguiente forma
    // {
    //   provide: AppService,
    //   useClass: AppService
    // }
    // NestJS nos ahorra esto escribiendo simplemente: AppService,

    // Use factory permite crear valores dinámicamente. El valor real del provider ( sean valores, objetos, clases)
    // será proporcionado por lo que se devuelva en una función fabricadora, aun si el valor se obtenga de forma
    // asíncrona. La función fabricadora puede recibir parámetros.
    {
      provide: 'TASKS',
      useFactory: async (http: HttpService) => {
        const req = http.get('https://jsonplaceholder.typicode.com/todos');
        const tasks = await lastValueFrom(req);
        return tasks.data;
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
