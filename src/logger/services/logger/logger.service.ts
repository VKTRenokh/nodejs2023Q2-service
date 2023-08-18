import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';

@Injectable({
  scope: Scope.TRANSIENT
})
export class LoggerService extends ConsoleLogger {
  isLogLevelEnabled(logLevel: number) {
    console.log(process.env.LOG_LEVEL)
  }

  log(message: unknown, ...messages: unknown[]) {
    super.log(message)
  }
}
