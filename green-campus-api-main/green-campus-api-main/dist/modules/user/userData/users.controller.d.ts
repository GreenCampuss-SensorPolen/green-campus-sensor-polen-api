import * as authenticatedRequestInterface from 'src/constants/interfaces/authenticatedRequest.interface';
import { UpdateUserDto } from './dto';
import { UserService } from './user.service';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UserService);
    updateProfile(req: authenticatedRequestInterface.AuthenticatedRequest, updateProfileDto: UpdateUserDto): Promise<{
        userId: number;
        role: string;
        email: string;
        firstName: string;
        lastName: string;
    }>;
}
