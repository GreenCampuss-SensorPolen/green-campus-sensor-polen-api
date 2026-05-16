import { JwtService } from '@nestjs/jwt';
import { User } from 'src/modules/user/userData/entities/user.entity';
import { HashingProvider } from 'src/providers/hashing.provider';
import { MailProvider } from 'src/providers/mail.provider';
import { Repository } from 'typeorm';
import { ForgotPasswordDto, LoginDto, RegisterDto, ResetPasswordDto } from './dto';
export declare class AuthService {
    private readonly userRepository;
    private readonly hashingProvider;
    private readonly jwtService;
    private mailProvider;
    constructor(userRepository: Repository<User>, hashingProvider: HashingProvider, jwtService: JwtService, mailProvider: MailProvider);
    login(body: LoginDto): Promise<{
        jwt: string;
        email: string;
        firstName: string;
        lastName: string;
        role: string;
    }>;
    forgotPassword(body: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    resetPassword(body: ResetPasswordDto): Promise<User>;
    register(body: RegisterDto): Promise<{
        userId: number;
        email: string;
        firstName: string;
        lastName: string;
        role: string;
    }>;
    deleteUser(userId: number): Promise<User>;
}
