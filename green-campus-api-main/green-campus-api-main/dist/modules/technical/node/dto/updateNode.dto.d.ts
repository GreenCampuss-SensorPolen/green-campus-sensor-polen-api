import { CreateNodeDto } from './createNode.dto';
declare const UpdateNodeDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateNodeDto>>;
export declare class UpdateNodeDto extends UpdateNodeDto_base {
    readonly time?: Date;
    readonly name?: string;
    readonly type?: string;
    readonly status?: string;
    readonly battery?: number;
    readonly location?: string;
    readonly building?: string;
    readonly floor?: string;
}
export {};
