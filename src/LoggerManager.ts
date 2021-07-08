import Logger from "./Logger";

export default interface LoggerManager {
    Get(name: string): Logger;
}