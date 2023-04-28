import { Module, Global } from '@nestjs/common';

const API_KEY = '12345';

@Global() // Lo que este en provider, estara instanciado en toda la aplicacion
@Module({
  providers: [
    // Forma de proveer un solo valor y se hace de la siguiente forma
    {
      provide: 'API_KEY',
      useValue: API_KEY,
    },
  ],
  // Exportando valores para que otros modulos accedan a el (Como esto es un modulo global NO hay que importar en los demas modulos)
  exports: ['API_KEY'],
})
export class DatabaseModule {}
