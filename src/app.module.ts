import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

// Modules
import { ProductsModule } from './modules/products/products.module';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [HttpModule, ProductsModule, UsersModule, DatabaseModule],
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
