import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';

@Injectable({
  scope: Scope.TRANSIENT
})
export class LoggerService extends ConsoleLogger {
  log(message: any, context?: string): void;
  log(message: any, ...optionalParams: any[]): void;
  log(message: unknown, context?: unknown): void {
    super.log(message, context)
  }

  warn(message: any, context?: string): void;
  warn(message: any, ...optionalParams: any[]): void;
  warn(message: unknown, context?: unknown): void {
    super.warn(message, context)
  }

  error(message: any, stack?: string, context?: string): void;
  error(message: any, ...optionalParams: any[]): void;
  error(message: unknown, stack?: unknown, context?: unknown): void {
    super.error(message, stack, context)
  }
}
