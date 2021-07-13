import { Logger } from "./Logger";
import { DefaultLoggerName } from "./Constants";

class LoggerConfigurationInteral {
    public name: string;
    public enabled: boolean;
    public delim: string;
    public errorEnabled: boolean;
    public infoEnabled: boolean;
    public warnEnabled: boolean;
    public logEnabled: boolean;
    public debugEnabled: boolean;
    constructor(other: ConsoleLoggerConfiguration) {
        this.name = other?.name ?? DefaultLoggerName;
        this.enabled = other?.enabled ?? true;
        this.delim = other?.delim ?? '|';
        this.errorEnabled = other?.errorEnabled ?? true;
        this.infoEnabled = other?.infoEnabled ?? true;
        this.warnEnabled = other?.warnEnabled ?? true;
        this.logEnabled = other?.logEnabled ?? true;
        this.debugEnabled = other?.debugEnabled ?? false;
    }
}

function LoggerConfigurationInteral_To_ConsoleLoggerConfiguration(conf: LoggerConfigurationInteral): ConsoleLoggerConfiguration {
    return {
        name: conf.name,
        enabled: conf.enabled,
        delim: conf.delim,
        errorEnabled: conf.errorEnabled,
        infoEnabled: conf.infoEnabled,
        warnEnabled: conf.warnEnabled,
        logEnabled: conf.logEnabled,
        debugEnabled: conf.debugEnabled
    }
}

export class ConsoleLoggerConfiguration {
    public name?: string;
    public enabled?: boolean;
    public delim?: string;
    public errorEnabled?: boolean;
    public infoEnabled?: boolean;
    public warnEnabled?: boolean;
    public logEnabled?: boolean;
    public debugEnabled?: boolean;
}

export default class ConsoleLogger implements Logger {
    private _logTypes = {
        inf: "INF",
        err: "ERR",
        wrn: "WRN",
        log: "LOG",
        dbg: "DBG"
    }
    private _COLOURS = {
        Reset: "\x1b[0m",
        Bright: "\x1b[1m",
        Dim: "\x1b[2m",
        Underscore: "\x1b[4m",
        Blink: "\x1b[5m",
        Reverse: "\x1b[7m",
        Hidden: "\x1b[8m",

        FgBlack: "\x1b[30m",
        FgRed: "\x1b[31m",
        FgGreen: "\x1b[32m",
        FgYellow: "\x1b[33m",
        FgBlue: "\x1b[34m",
        FgMagenta: "\x1b[35m",
        FgCyan: "\x1b[36m",
        FgWhite: "\x1b[37m",

        BgBlack: "\x1b[40m",
        BgRed: "\x1b[41m",
        BgGreen: "\x1b[42m",
        BgYellow: "\x1b[43m",
        BgBlue: "\x1b[44m",
        BgMagenta: "\x1b[45m",
        BgCyan: "\x1b[46m",
        BgWhite: "\x1b[47m"
    }
    private _config: LoggerConfigurationInteral;
    public get config(): ConsoleLoggerConfiguration {
        return this._config
    }

    public set config(v: ConsoleLoggerConfiguration) {
        this._config = new LoggerConfigurationInteral(v)
    }

    private get date(): string {
        return (new Date()).toLocaleString()
    }

    constructor(loggerConf: ConsoleLoggerConfiguration) {
        this._config = new LoggerConfigurationInteral(loggerConf)
    }

    public info(...args: any[]): void {
        if (!this._config.enabled || !this._config.infoEnabled) return
        console.info(
            this._COLOURS.Bright,
            this.date,
            this._config.delim,
            this._logTypes.inf,
            this._config.delim,
            this._config.name,
            this._config.delim,
            this._COLOURS.Reset,
            ...args
        )
    }

    public error(...args: any[]): void {
        if (!this._config.enabled || !this._config.errorEnabled) return
        console.error(
            this._COLOURS.FgRed,
            this.date,
            this._config.delim,
            this._logTypes.err,
            this._config.delim,
            this._config.name,
            this._config.delim,
            this._COLOURS.Reset,
            ...args
        )
    }

    public warn(...args: any[]): void {
        if (!this._config.enabled || !this._config.warnEnabled) return
        console.warn(
            this._COLOURS.FgYellow,
            this.date,
            this._config.delim,
            this._logTypes.wrn,
            this._config.delim,
            this._config.name,
            this._config.delim,
            this._COLOURS.Reset,
            ...args
        )
    }

    public log(...args: any[]): void {
        if (!this._config.enabled || !this._config.logEnabled) return
        console.log(
            this._COLOURS.Reset,
            this.date,
            this._config.delim,
            this._logTypes.log,
            this._config.delim,
            this._config.name,
            this._config.delim,
            this._COLOURS.Reset,
            ...args
        )
    }

    public debug(...args: any[]): void {
        if (!this._config.enabled || !this._config.debugEnabled) return
        console.debug(
            this._COLOURS.Dim,
            this.date,
            this._config.delim,
            this._logTypes.dbg,
            this._config.delim,
            this._config.name,
            this._config.delim,
            this._COLOURS.Reset,
            ...args
        )
    }
}
