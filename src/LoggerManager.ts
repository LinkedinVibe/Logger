import { Logger } from "./Logger";
interface LoggerManager {
    Get(name: string): Logger;
}

export type { LoggerManager }