import { NestFactory } from '@nestjs/core';
// Permite validar los datos que se reciben en los controladores
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Indicamos que vamos a usar el ValidationPipe en toda la aplicación
  app.useGlobalPipes(
    new ValidationPipe({
      // Eliminar del payload los parametros recibidos que no estan definidos en el DTO
      whitelist: true,
      // Informar a la API que se esta enviando un parametro no definido en el DTO
      // !No siempre es bueno hacer esto, whitelist si se debe usar siempre
      // forbidNonWhitelisted: true,
    }),
  );

  await app.listen(3000);
}
bootstrap();
