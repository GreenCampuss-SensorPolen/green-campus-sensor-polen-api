import { AuthService } from './auth.service';
import { ForgotPasswordDto, LoginDto, RegisterDto, ResetPasswordDto } from './dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<{
        jwt: string;
        email: string;
        firstName: string;
        lastName: string;
        role: string;
    }>;
    forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<import("../modules/user/userData/entities/user.entity").User>;
    register(registerDto: RegisterDto): Promise<{
        userId: number;
        email: string;
        firstName: string;
        lastName: string;
        role: string;
    }>;
    deleteUser(id: number): Promise<import("../modules/user/userData/entities/user.entity").User>;
}
