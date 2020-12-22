import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { validationSchema } from './config/validation';

@Module({
  imports: [HttpModule, ConfigModule.forRoot({ validationSchema })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
