import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'];

    if (!token) {
      throw new Error('Token is missing');
    }

    try {
      const payload = this.jwtService.verify(token.split(' ')[1]);
      request.user = payload;
      return true;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}
