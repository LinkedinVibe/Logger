interface Logger {
    info(...args: any[]): void;
    error(...args: any[]): void;
    warn(...args: any[]): void;
    log(...args: any[]): void;
    debug(...args: any[]): void;
}

export type { Logger }