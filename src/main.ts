import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // إعدادات Swagger
  const config = new DocumentBuilder()
    .setTitle('Employees API')
    .setDescription('CRUD API for employees with static data')
    .setVersion('1.0')
    .addTag('Employees') 
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
