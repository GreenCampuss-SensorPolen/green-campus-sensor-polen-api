import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
declare const CombinedAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class CombinedAuthGuard extends CombinedAuthGuard_base {
    private reflector;
    constructor(reflector: Reflector);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | import("rxjs").Observable<boolean>;
}
export {};
