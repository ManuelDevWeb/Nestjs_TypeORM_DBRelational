import { Injectable, Inject } from '@nestjs/common';
// Permite instanciar un objeto con la config
import { ConfigType } from '@nestjs/config';
// Importando tipado de config
import config from './config';
// Importando pg para conectarnos a la DB o obtener su tipado
import { Client } from 'pg';

@Injectable()
export class AppService {
  constructor(
    // Injectando el provider de tipo useFactory
    @Inject('TASKS') private tasks: any[],
    // Inyectando dependencia del config module
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
    // Inyectando dependencia de tipo useFactory (Conexion a la DB)
    @Inject('PG_CONNECTION') private clientPg: Client,
  ) {}

  getHello(): string {
    const apiKey = this.configService.apiKey;
    const db = this.configService.database.name;
    return `Hello world! The APIKEY is ${apiKey} and the DB is ${db}`;
  }

  async getTaks(): Promise<any[]> {
    const res = await this.clientPg.query('SELECT * FROM tasks');
    return res.rows;
  }
}
