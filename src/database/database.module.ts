import { Module, Global } from '@nestjs/common';
// Permite instanciar un objeto con la config
import { ConfigType } from '@nestjs/config';
// Importando pg para conectarnos a la DB
import { Client } from 'pg';
// Importando tipado de config
import config from '../config';

const API_KEY = '12345';

@Global() // Lo que este en provider, estara instanciado en toda la aplicacion
@Module({
  providers: [
    // Forma de proveer un solo valor y se hace de la siguiente forma
    {
      provide: 'API_KEY',
      useValue: API_KEY,
    },
    {
      provide: 'PG_CONNECTION',
      useFactory: (configService: ConfigType<typeof config>) => {
        const { dbName, host, password, port, user } = configService.postgresDB;

        // Instancia de conexion
        const client = new Client({
          user,
          host,
          password,
          port,
          database: dbName,
        });

        client.connect();

        return client;
      },
      // Inyectando dependencia
      inject: [config.KEY],
    },
  ],
  // Exportando valores para que otros modulos accedan a el (Como esto es un modulo global NO hay que importar en los demas modulos)
  exports: ['API_KEY', 'PG_CONNECTION'],
})
export class DatabaseModule {}
