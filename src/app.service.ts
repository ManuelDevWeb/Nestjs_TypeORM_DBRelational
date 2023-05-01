import { Injectable, Inject } from '@nestjs/common';
// Permite instanciar un objeto con la config
import { ConfigType } from '@nestjs/config';
// Importando tipado de config
import config from './config';

@Injectable()
export class AppService {
  constructor(
    // Injectando el provider de tipo useFactory
    @Inject('TASKS') private tasks: any[],
    // Inyectando dependencia del config module
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  getHello(): string {
    const apiKey = this.configService.apiKey;
    const db = this.configService.database.name;
    return `Hello world! The APIKEY is ${apiKey} and the DB is ${db}`;
  }
}
