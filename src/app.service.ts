import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    // Injectando el provider de tipo useFactory
    @Inject('TASKS') private tasks: any[],
    // Inyectando dependencia del config module
    private configService: ConfigService,
  ) {}

  getHello(): string {
    console.log(this.tasks);
    return 'Hello World!' + this.configService.get('API_KEY');
  }
}
