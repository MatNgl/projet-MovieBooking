import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(username: string, password: string): Promise<User> {
    const user = this.usersRepository.create({ username, password });
    return this.usersRepository.save(user);
  }

  async findOne(username: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ where: { username } });
    return user ?? undefined;
  }  

  async findOneById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } }); 
    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }
    return user;
  }

  async findOneByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { username } });
  }
  
}
