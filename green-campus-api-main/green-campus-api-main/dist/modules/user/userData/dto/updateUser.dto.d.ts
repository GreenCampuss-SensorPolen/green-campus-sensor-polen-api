import { RegisterDto } from 'src/auth/dto';
declare const UpdateUserDto_base: import("@nestjs/mapped-types").MappedType<Partial<RegisterDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    readonly email?: string;
    password?: string;
    role?: string;
    readonly firstName?: string;
    readonly lastName?: string;
}
export {};
