import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const configService = app.get(ConfigService);
  // const allowList = configService.get<string>('WHITELIST_URL').split(',');
  // const env = configService.get<string>('NODE_ENV');

  app.enableCors();

  // app.enableCors({
  //   origin: (origin, callback) => {
  //     // allow requests with no origin
  //     // (like mobile apps or curl requests)
  //     if (!origin && env !== 'production') return callback(null, true);

  //     if (allowList.indexOf(origin) === -1) {
  //       const msg =
  //         'The CORS policy for this site does not allow access from the specified Origin.';
  //       return callback(new Error(msg), false);
  //     }
  //     return callback(null, true);
  //   },
  // });

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
