import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { MoviesModule } from './movies/movies.module';
import { HttpModule } from '@nestjs/axios';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'MovieBooker',
      entities: [User],
      synchronize: true, 
    }),
    JwtModule.register({
      secret: 'ton_secret',
      signOptions: { expiresIn: '60m' },
    }),
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    HttpModule,
    MoviesModule,
  ],
})
export class AppModule {}
