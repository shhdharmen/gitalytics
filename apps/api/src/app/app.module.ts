import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { ServeStaticModule } from '@nestjs/serve-static';
// import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { validationSchema } from './config/validation';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({ validationSchema }),
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '..', 'client'),
    //   exclude: ['/api*'],
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
