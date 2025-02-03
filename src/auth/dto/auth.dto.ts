import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'john', description: "Nom d'utilisateur" })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'changeme', description: 'Mot de passe' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
