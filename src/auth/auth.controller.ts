import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { Public } from 'src/decorator/customize';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  handleLogin(@Request() req) {
    console.log('zxczc', req);
    return this.authService.login(req.user);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
