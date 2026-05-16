export declare class HashingProvider {
    private readonly saltRounds;
    hash(password: string): Promise<string>;
    compare(password: string, hash: string): Promise<boolean>;
}
