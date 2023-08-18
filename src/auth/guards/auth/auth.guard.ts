import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
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

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest()

    const accessToken =

    return isPublic
  }
}
