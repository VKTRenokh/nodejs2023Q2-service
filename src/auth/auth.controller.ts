import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(@Body() dto: AuthDto) {
    return await this.authService.login(dto)
  }

  @Post('signup')
  async signup(@Body() dto: AuthDto) {
    return await this.authService.signup(dto)
  }
}
