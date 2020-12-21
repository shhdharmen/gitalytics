import { Injectable } from '@nestjs/common';
import { Message } from '@gitalytics/api-interfaces';

@Injectable()
export class AppService {
  constructor() {}

  getHello(): Message {
    return { message: 'Welcome to api!' };
  }
}
