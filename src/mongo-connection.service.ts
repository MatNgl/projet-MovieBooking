import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class MongoConnectionService implements OnModuleInit {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  onModuleInit() {
    this.connection.on('connected', () => {
      console.log('MongoDB connecté avec succès');
    });

    this.connection.on('error', (err) => {
      console.error('Erreur de connexion à MongoDB:', err);
    });

    this.connection.on('disconnected', () => {
      console.log('MongoDB déconnecté');
    });
  }
}
