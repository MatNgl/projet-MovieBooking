  // users.controller.ts
  import { Controller, Get, UseGuards, Request } from '@nestjs/common';
  import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
  import { ApiBearerAuth } from '@nestjs/swagger';

  @Controller('users')
  export class UsersController {
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Request() req) {
      console.log(req.user);
      if (!req.user) {
        throw new Error('Utilisateur non authentifié');
      }
      return { id: req.user.sub, username: req.user.username };
    }
  }
