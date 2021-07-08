import ConsoleLogger from "./ConsoleLogger";
import { ConsoleLoggerConfiguration } from "./ConsoleLogger";
import { DefaultLoggerName } from "./Constants";
import { LoggerManager } from "./LoggerManager";

export default class ConsoleLoggerManager implements LoggerManager {
    private _name: string;
    private _loggers: any;
    private _default: ConsoleLogger;
    private _self: ConsoleLogger;
    constructor() {
        this._name = "LoggerManager";
        this._loggers = {
            [DefaultLoggerName]: new ConsoleLogger({
                name: DefaultLoggerName
            }),
            [this._name]: new ConsoleLogger({
                name: this._name
            })
        }
        this._default = this._loggers[DefaultLoggerName]
        this._self = this._loggers[this._name]
    }

    public Get(name: string): ConsoleLogger {
        if (name === undefined || name == null || name == "") {
            this._self.warn(`No name was provided, returning 'default' logger`);
            return this._default;
        }
        if (name in this._loggers) {
            return this._loggers[name];
        }
        this._self.warn(`Can't find logger "${name}", creating new with "${DefaultLoggerName}" configs`)
        this.Set({ name: name })
        return this.Get(name)
    }

    private Set(loggerConf: ConsoleLoggerConfiguration): void {
        const name = loggerConf?.name ?? DefaultLoggerName
        if (name in this._loggers) {
            this._self.debug(`Setting logger, settings : `, loggerConf)
            const loggerToUpdate = this._loggers[name]
            loggerToUpdate.config = loggerConf
        } else {
            this._self.debug(`Adding logger, settings : `, loggerConf)
            this._loggers[name] = new ConsoleLogger(loggerConf)
        }
    }
}