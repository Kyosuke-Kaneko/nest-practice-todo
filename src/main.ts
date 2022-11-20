import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter()); //グローバルフィルターの登録
  // app.useGlobalPipes(new ValidationPipe());//グローバルスコープ付きのパイプ
  await app.listen(3000);
}
bootstrap();
