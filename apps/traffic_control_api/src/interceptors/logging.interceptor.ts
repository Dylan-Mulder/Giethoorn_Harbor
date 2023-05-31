import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";

export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log("Before reaching the request handler");
    const startTime = Date.now();

    const methodName = context.getHandler().name;
    const className = context.getClass().name;

    return next
      .handle()
      .pipe(
        tap(() =>
          console.log(`Response Lag for ${methodName} in class ${className}: ${Date.now() - startTime}ms`)
        )
      )
  }
}