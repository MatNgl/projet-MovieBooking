// src/users/users.controller.ts
import { Controller, Get, UseGuards, Request, NotFoundException } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    console.log('Utilisateur dans req.user:', req.user);
    if (!req.user) {
      console.log('Utilisateur non authentifié');
      throw new NotFoundException('Utilisateur non authentifié');
    }
    return { id: req.user.id, username: req.user.username };
  }
}
