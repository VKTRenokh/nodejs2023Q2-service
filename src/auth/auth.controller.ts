import { Body, Controller, ForbiddenException, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/auth/decorators/public/public.decorator'
import { AuthDto } from './dto/auth.dto';
import { LoggerService } from 'src/logger/services/logger/logger.service';
import { RefreshDto } from './dto/refresh.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private logger: LoggerService) { }

  @Public()
  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: AuthDto) {
    const logined = await this.authService.login(dto)

    this.logger.log('login try')

    if (!logined) {
      throw new ForbiddenException()
    }

    return logined
  }

  @HttpCode(200)
  @Post('refresh')
  async refresh(@Body() dto: RefreshDto) {
    const refresh = this.authService.refresh(dto)

    if (!refresh) {
      throw new ForbiddenException()
    }

    return refresh
  }

  @Public()
  @HttpCode(201)
  @Post('signup')
  async signup(@Body() dto: AuthDto) {
    return await this.authService.signup(dto)
  }
}
