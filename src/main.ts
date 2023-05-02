import { NestFactory } from '@nestjs/core';
// Permite validar los datos que se reciben en los controladores
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

// Documentacion API
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Indicamos que vamos a usar el ValidationPipe en toda la aplicación
  app.useGlobalPipes(
    new ValidationPipe({
      // Eliminar del payload los parametros recibidos que no estan definidos en el DTO o en el objeto que debe recibir un endpoint
      whitelist: true,
      // Informar a la API que se esta enviando un parametro no definido en el DTO o en el objeto que debe recibir un endpoint
      // !No siempre es bueno hacer esto, whitelist si se debe usar siempre
      // forbidNonWhitelisted: true,
    }),
  );

  // Creando documentacion
  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('Store Nestjs')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  // Endpoint del cual sale la documentacion automaticamente
  SwaggerModule.setup('docs', app, document);

  // Habilitando CORS, se puede especificar las urls a habilitar
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
