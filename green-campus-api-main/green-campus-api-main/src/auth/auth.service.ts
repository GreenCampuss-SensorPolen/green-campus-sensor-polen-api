import { ConflictException, GoneException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, RoleLabels } from 'src/constants/enums/role.enum';
import { User } from 'src/modules/user/userData/entities/user.entity';
import { HashingProvider } from 'src/providers/hashing.provider';
import { MailProvider } from 'src/providers/mail.provider';
import { Repository } from 'typeorm';

import { ForgotPasswordDto, LoginDto, RegisterDto, ResetPasswordDto } from './dto';

const resetCodes = new Map<string, { code: string; usesLeft: number; expiration: Date }>();

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly hashingProvider: HashingProvider,
    private readonly jwtService: JwtService,
    private mailProvider: MailProvider,
  ) {}

  async login(body: LoginDto) {
    // Get the user from the email
    const user: User | null = await this.userRepository.findOneBy({ email: body.email });
    if(user == null) throw new NotFoundException('User not found');
    // Check if the password is correct
    if(!await this.hashingProvider.compare(body.password, user.password)) throw new UnauthorizedException('Invalid credentials');
    // Return the important data
    const payload = { email: body.email, role: user.role };
    return {
      jwt: this.jwtService.sign(payload),
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: RoleLabels[user.role as Role],
    };
  }

  async forgotPassword(body: ForgotPasswordDto) {
    // Get the user from the email
    const user: User | null = await this.userRepository.findOneBy({ email: body.email });
    if(!user) throw new NotFoundException('User not found');
    // Generate code and expiration
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiration = new Date();
    expiration.setMinutes(expiration.getMinutes() + 5);
    resetCodes.set(body.email, { code: code, usesLeft: 5, expiration: expiration });
    // Send email with the code
    await this.mailProvider.sendRecoveryCode(body.email, code);
    return { message: 'Code sent' };
  }

  async resetPassword(body: ResetPasswordDto) {
    // Check if a code exist
    const resetCodeData = resetCodes.get(body.email);
    if(resetCodeData == null) throw new NotFoundException('No reset code for this email');
    // Check if it has expired
    if(new Date() > resetCodeData.expiration) {
      resetCodes.delete(body.email);
      throw new GoneException('Reset code has expired');
    }
    // Check if its not valid
    if(resetCodeData.code != body.code) {
      resetCodeData.usesLeft = resetCodeData.usesLeft - 1;
      if(resetCodeData.usesLeft == 0) resetCodes.delete(body.email);
      throw new UnauthorizedException('Invalid code');
    }
    // Delete the code and update the user
    resetCodes.delete(body.email);
    const user = await this.userRepository.findOneBy({ email: body.email });
    if(!user) throw new NotFoundException('User not found');
    // Update the user password
    const hashedPassword = await this.hashingProvider.hash(body.newPassword);
    user.password = hashedPassword;
    if(!user) throw new NotFoundException('User not found');
    else return this.userRepository.save(user);
  }

  async register(body: RegisterDto) {
    // Check if a user with the same email exists
    if(await this.userRepository.findOneBy({ email: body.email }) != null) throw new ConflictException('Email already exists');
    // Create and save user
    const hashedPassword = await this.hashingProvider.hash(body.password);
    const user: User = this.userRepository.create({
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
      password: hashedPassword,
      role: getRoleFromLabel(body.role),
    });
    await this.userRepository.save(user);
    // Return the important data
    return {
      userId: user.userId,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: RoleLabels[user.role as Role],
    };
  }

  async deleteUser(userId: number) {
    const user: User | null = await this.userRepository.findOneBy({ userId });
    if(!user) throw new NotFoundException('User not found');
    else return this.userRepository.remove(user);
  }
}

function getRoleFromLabel(label: string): Role | undefined {
  return (Object.keys(RoleLabels) as Role[]).find(key => RoleLabels[key] === label);
}
