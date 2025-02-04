import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';  // Assurez-vous que le chemin est correct
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { username, password } = registerDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.usersService.create(username, hashedPassword);
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findOne(loginDto.username); 
    
    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new Error('Identifiants invalides');
    }

    const payload = { sub: user.id, username: user.username };
    return { access_token: this.jwtService.sign(payload) };
  }
}
