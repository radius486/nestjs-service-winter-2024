import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { CommonExceptionFilter } from './common/exception-filters/common-exception.filter';

declare global {
  interface BigInt {
    toJSON(): number;
  }
}

BigInt.prototype.toJSON = function () {
  return Number(this);
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 4000;

  const config = new DocumentBuilder()
    .setTitle('NestJS Service')
    .setDescription('REST API documentation')
    .setVersion('1.0.0')
    .addTag('NestJS')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  const httpAdapter = app.get(HttpAdapterHost);

  SwaggerModule.setup('/api/docs', app, document);

  app.useGlobalPipes(new ValidationPipe({}));
  app.useGlobalFilters(new CommonExceptionFilter(httpAdapter));

  await app.listen(PORT, () => console.log('Server started on port:', PORT));
}

bootstrap();
