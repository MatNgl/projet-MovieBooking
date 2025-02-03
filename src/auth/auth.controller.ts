import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Se connecter' })
  @ApiResponse({ status: 200, description: 'Token JWT généré', schema: { example: { access_token: 'jwt_token' } } })
  @ApiResponse({ status: 401, description: 'Identifiants invalides' })
  async signIn(@Body() loginDto: LoginDto) {
    return this.authService.signIn(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth() // Indique que cette route nécessite un token JWT
  @ApiOperation({ summary: 'Obtenir le profil utilisateur' })
  async getProfile(@Request() req) {
    return req.user;
  }
}
