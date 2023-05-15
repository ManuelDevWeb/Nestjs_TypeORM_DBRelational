import { Module, Global } from '@nestjs/common';
// Permite instanciar un objeto con la config
import { ConfigType } from '@nestjs/config';
// Importando pg para conectarnos a la DB
import { Client } from 'pg';
// Importando typeorm
import { TypeOrmModule } from '@nestjs/typeorm';
// Importando tipado de config
import config from '../config';

const API_KEY = '12345';

@Global() // Lo que este en provider, estara instanciado en toda la aplicacion
@Module({
  // Importando typeorm
  imports: [
    TypeOrmModule.forRootAsync({
      // Inyectando dependencia
      inject: [config.KEY],
      // Configurando typeorm
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, dbName, host, password, port } = configService.postgresDB;

        return {
          type: 'postgres', // Tipo de DB
          host, // Host de la DB
          port, // Puerto de la DB
          username: user, // Usuario de la DB
          password, // Contraseña de la DB
          database: dbName, // Nombre de la DB
          synchronize: false, // Sincronizar las entidades con la DB (Solo se recomienda usar en dev y stage)
          autoLoadEntities: true, // Cargar las entidades automaticamente
        };
      },
    }),
  ],
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
  exports: ['API_KEY', 'PG_CONNECTION', TypeOrmModule],
})
export class DatabaseModule {}
