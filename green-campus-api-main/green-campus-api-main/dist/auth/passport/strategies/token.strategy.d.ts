import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-http-bearer';
import { Role } from 'src/constants/enums/role.enum';
declare const TokenStrategy_base: new (...args: [options: import("passport-http-bearer").IStrategyOptions] | []) => Strategy<import("passport-http-bearer").VerifyFunctions> & {
    validate(...args: any[]): unknown;
};
export declare class TokenStrategy extends TokenStrategy_base {
    private configService;
    constructor(configService: ConfigService);
    validate(token: string): {
        email: string | undefined;
        role: Role;
    };
}
export {};
