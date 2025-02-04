import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';  // Ajout de JwtModule

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'MovieBooker',
      entities: [User], // Charger l'entité User
      synchronize: true, // Crée automatiquement les tables
    }),
    JwtModule.register({
      secret: 'ton_secret', // Utilise un secret sécurisé ou une variable d'environnement
      signOptions: { expiresIn: '60m' }, // Optionnel : configure l'expiration du JWT
    }),
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
