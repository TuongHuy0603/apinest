import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth/auth.service';

@Controller() //  route /
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService,
    private authService: AuthService

  ) { }

}
