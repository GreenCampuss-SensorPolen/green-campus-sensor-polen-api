import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, RoleLabels } from 'src/constants/enums/role.enum';
import { HashingProvider } from 'src/providers/hashing.provider';
import { Repository } from 'typeorm';

import { UpdateUserDto } from './dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly hashingProvider: HashingProvider,
  ) {}

  async updateUser(email: string, body: UpdateUserDto) {
    // Get the user from the email
    const user: User | null = await this.userRepository.findOneBy({ email: email });
    if(!user) throw new NotFoundException('User not found');
    // Hash password if there is one
    if(body.password != null && body.password != undefined && body.password != '') {
      body.password = await this.hashingProvider.hash(body.password);
    }
    // Don't allow role edits
    if(body.role != null && body.role != undefined && body.role != '') {
      throw new UnauthorizedException('Can not edit user role');
    }
    // Update the User
    await this.userRepository.update(user.userId, body);
    // Return the relevant data
    const updatedUser: User | null = await this.userRepository.findOneBy({ email: email });
    if(!updatedUser) throw new NotFoundException('User not found');
    return {
      userId: updatedUser.userId,
      role: RoleLabels[updatedUser.role as Role],
      email: updatedUser.email,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
    };
  }
}
