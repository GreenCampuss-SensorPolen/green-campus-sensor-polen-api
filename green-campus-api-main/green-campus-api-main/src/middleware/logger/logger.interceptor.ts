import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  // Use Nest's built-in Logger for better formatting
  private readonly logger = new Logger('Logger');

  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const { method, url, ip } = request;
    const userAgent = (request.headers['user-agent'] as string) || '';
    const body = JSON.stringify(request.body) || '';

    this.logger.log(`${method} [${ip}] "${url}": ${body} (${userAgent})`);
    return next.handle().pipe(tap(() => {}));
  }
}
