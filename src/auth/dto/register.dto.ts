import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'john', description: "Nom d'utilisateur" })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'changeme', description: 'Mot de passe de l\'utilisateur' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Le mot de passe doit contenir au moins 6 caractères' })
  password: string;
}
