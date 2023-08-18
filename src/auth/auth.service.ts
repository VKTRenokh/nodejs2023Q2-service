import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseService } from 'src/shared/database/database.service';
import { AuthDto } from './dto/auth.dto';
import { RefreshDto } from './dto/refresh.dto';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private databaseService: DatabaseService, private configService: ConfigService, private jwtService: JwtService) { }

  async login(dto: AuthDto) {
    const user = await this.databaseService.getUserByName(dto.login)

    if (!user) {
      return
    }

    if ((await compare(dto.password, user.password))) {
      return
    }

    const payload = {
      sub: user.id,
      username: user.login
    }

    return {
      refreshToken: await this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_SECRET_REFRESH_KEY'),
        expiresIn: this.configService.get('TOKEN_REFRESH_EXPIRE_TIME')
      }),
      accessToken: await this.jwtService.signAsync(payload),
    }
  }

  async signup(dto: AuthDto) {
    return await this.databaseService.createUser(dto)
  }

  async refresh(dto: RefreshDto) {
    const user = await this.jwtService.verifyAsync(dto.refreshToken, {
      secret: this.configService.get("JWT_SECRET_REFRESH_KEY"),
    })

    if (!user) {
      return
    }

    return {
      refreshToken: dto.refreshToken,
      accessToken: await this.jwtService.signAsync({
        sub: user.sub,
      }),
    }
  }
}
