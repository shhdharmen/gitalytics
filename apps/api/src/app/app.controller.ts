import { Controller, Get, HttpService, Post, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { Message } from '@gitalytics/api-interfaces';

import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  private token: string;
  private api_url: string;
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService
  ) {
    this.token = this.configService.get('PAT');
    this.api_url = this.configService.get<string>('API_URL');
  }

  @Get('hello')
  getHello(): Message {
    return this.appService.getHello();
  }

  @Post('github')
  async github(@Req() req: Request, @Res() res: Response) {
    const result = await this.httpService
      .post(this.api_url, req.body, {
        headers: { Authorization: 'Bearer ' + this.token },
      })
      .toPromise();
    res.status(result.status).send(result.data);
  }
}
