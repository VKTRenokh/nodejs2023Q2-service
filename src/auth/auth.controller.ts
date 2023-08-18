import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/auth/decorators/public/public.decorator'
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Public()
  @Post('login')
  async login(@Body() dto: AuthDto) {
    return await this.authService.login(dto)
  }

  @Public()
  @Post('signup')
  async signup(@Body() dto: AuthDto) {
    return await this.authService.signup(dto)
  }
}
