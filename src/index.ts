import { Logger } from "./Logger";
import ConsoleLogger from "./ConsoleLogger";
import { LoggerManager } from "./LoggerManager";
import ConsoleLoggerManager from "./ConsoleLoggerManager";
import { ConsoleLoggerConfiguration } from "./ConsoleLogger";

let _manager: ConsoleLoggerManager | null = null

export default function GetLogger(name: string): ConsoleLogger {
    if (_manager == null) _manager = new ConsoleLoggerManager()
    return _manager.Get(name)
}

export {
    Logger,
    ConsoleLogger,
    LoggerManager,
    ConsoleLoggerManager,
    ConsoleLoggerConfiguration,
    GetLogger
}
