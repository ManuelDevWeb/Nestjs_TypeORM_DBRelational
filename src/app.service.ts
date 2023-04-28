import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
    // Injectando el provider de tipo useValue
    @Inject('API_KEY') private apiKey: string,
    // Injectando el provider de tipo useFactory
    @Inject('TASKS') private tasks: any[],
  ) {}

  getHello(): string {
    console.log(this.tasks);
    return 'Hello World!' + this.apiKey;
  }
}
