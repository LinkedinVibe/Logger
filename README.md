# Yet another Logger
## Features:
1. Embedded highlightning
2. Easy to use
3. Not async (for now)
4. Easily can be created as many loggers as you want with different settings
5. Can be setup using config file (in progress)
6. TS compatible

## Get started
### Simple usage
```ts
import { GetLogger } from "@zzck.dev/logger";

const mainLogger = GetLogger("main")

mainLogger.info('Info message')
mainLogger.warn('Warn message')
mainLogger.log('Log message')
mainLogger.error('Error message')
mainLogger.debug('DebugDisabled message')
/* By default debug is disabled */
mainLogger.config.debugEnabled = true
mainLogger.debug('DebugEnabled message')
```
Output:
![Simple usage output](https://github.com/LinkedinVibe/Logger/blob/master/images/simple-usage.png?raw=true)

### Logger configuration
```ts
import { GetLogger } from "@zzck.dev/logger";

const configExample = GetLogger('ConfigExample')
configExample.config = {
    name: "AnotherConfigExample",
    infoEnabled: false,
    logEnabled: false,
    debugEnabled: true,
    delim: '@'
}

configExample.info('Info message')
configExample.warn('Warn message')
configExample.log('Log message')
configExample.error('Error message')
configExample.debug('Debug message')
```
Output:
![Simple config](https://github.com/LinkedinVibe/Logger/blob/master/images/simple-config.png?raw=true)

### Advanced usage
Internally `GetLogger` creates a singleton instance of LoggerManager which after spawns loggers. Following logic is incapsulated in `GetLogger` function:

```ts
let _manager = null

function GetLogger(name: string): ConsoleLogger {
    if (_manager == null) _manager = new ConsoleLoggerManager()
    return _manager.Get(name)
}
```
So if you want to control the lifetime of logger manager object you can create it by yourself, as on the following example:
```ts
import { ConsoleLoggerManager } from "@zzck.dev/logger";

const manager = new ConsoleLoggerManager()
const logger = manager.Get("logger")

logger.error("2+2=5")
```
Output:
![LoggerManager created by yourself](https://github.com/LinkedinVibe/Logger/blob/master/images/logger-manager.png?raw=true)