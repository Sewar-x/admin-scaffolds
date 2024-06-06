declare module 'js-cookie' {
    export interface CookieOptions {
        path?: string;
        domain?: string;
        secure?: boolean;
        expires?: number;
    }

    export function set(name: string, value: string, options?: CookieOptions): void;
    export function get(name: string): string | null;
    export function get(): string | null;
    export function remove(name: string, options?: CookieOptions): void;
}
