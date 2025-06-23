import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT: string | undefined = process.env.PORT;
  const app = await NestFactory.create(AppModule);
  await app.listen((PORT as string) ?? 5000, () =>
    console.log(`connected on ${PORT}`),
  );
}
bootstrap();
