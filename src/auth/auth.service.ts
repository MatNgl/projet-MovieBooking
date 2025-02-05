import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
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
    
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await this.usersService.findOneByUsername(username); // Remplacer ici
    if (existingUser) {
      throw new UnauthorizedException('Nom d\'utilisateur déjà pris');
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.usersService.create(username, hashedPassword);
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;
  
    // Récupérer l'utilisateur depuis la base de données avec la méthode correcte
    const user = await this.usersService.findOneByUsername(username);
    if (!user) {
      throw new UnauthorizedException('Nom d\'utilisateur ou mot de passe incorrect');
    }
  
    // Comparer les mots de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Nom d\'utilisateur ou mot de passe incorrect');
    }
  
    // Créer le payload du JWT
    const payload = { sub: user.id, username: user.username };
    console.log('Payload du JWT:', payload);  // Vérifie le payload avant de créer le token
  
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}  