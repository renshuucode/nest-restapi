import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { ApiResponse } from '../interfaces/api-response.interface';

interface RequestWithUser extends Request {
  user?: { id: number; name: string; role: string };
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<RequestWithUser>();

    let status: number = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string = '服务器内部错误';
    // let errors: string[] = [];

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        const responseObj = exceptionResponse as {
          message: string[];
          errors: string[];
        };
        if (Array.isArray(responseObj.message)) {
          message = responseObj.message.join('; ');
        } else if (typeof responseObj.message === 'string') {
          message = responseObj.message;
        } else {
          message = exception.message;
        }
      } else {
        message = exception.message;
      }
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = '服务器内部错误';
      this.logger.error(
        `Unexpected error: ${exception instanceof Error ? exception.message : 'Unknown error'}`,
        exception instanceof Error ? exception.stack : undefined,
      );
    }

    const errorResponse: ApiResponse = {
      success: false,
      code: status,
      message,
      data: null,
    };

    this.logger.error(
      `HTTP ${status} Error: ${message}`,
      JSON.stringify({
        path: request.url,
        method: request.method,
        body: request.body as Record<string, unknown>,
        user: request.user?.id,
      }),
    );

    response.status(status).json(errorResponse);
  }
}
