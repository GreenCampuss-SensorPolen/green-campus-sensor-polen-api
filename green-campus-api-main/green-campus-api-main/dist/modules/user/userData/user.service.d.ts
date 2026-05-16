import { HashingProvider } from 'src/providers/hashing.provider';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto';
import { User } from './entities/user.entity';
export declare class UserService {
    private readonly userRepository;
    private readonly hashingProvider;
    constructor(userRepository: Repository<User>, hashingProvider: HashingProvider);
    updateUser(email: string, body: UpdateUserDto): Promise<{
        userId: number;
        role: string;
        email: string;
        firstName: string;
        lastName: string;
    }>;
}
