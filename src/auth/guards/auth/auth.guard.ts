import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from 'src/auth/decorators/public/public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService, private configService: ConfigService) { }

  private extractTokenFromHeaders(request: Request) {
    if (!request.headers || !request.headers['authorization']) {
      return undefined
    }

    const [type, token] = request.headers['authorization'].split(' ');
    return type === 'Bearer' ? token : undefined;
  }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return isPublic
    }

    const request = context.switchToHttp().getRequest()

    const accessToken = this.extractTokenFromHeaders(request)

    try {
      const payload = await this.jwtService.verifyAsync(accessToken, {
        secret: this.configService.get('JWT_SECRET_KEY'),
      })

      request['user'] = payload
    } catch (e) {
      console.log(e)
      throw new UnauthorizedException('idi nahui ti ne avtorizovan')
    }

    return true
  }
}
