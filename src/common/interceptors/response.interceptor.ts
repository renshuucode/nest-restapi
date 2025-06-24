import { ApiResponse } from '../interfaces/api-response.interface';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  HttpStatus,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Response, Request } from 'express';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ApiResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    return next.handle().pipe(
      map((data) => ({
        success: true,
        code: response.statusCode || HttpStatus.OK,
        message: this.getSuccessMessage(request.method || 'GET'),
        data: data as unknown as T,
      })),
    );
  }

  private getSuccessMessage(method: string): string {
    switch (method) {
      case 'POST':
        return '创建成功';
      case 'PUT':
      case 'PATCH':
        return '更新成功';
      case 'DELETE':
        return '删除成功';
      case 'GET':
      default:
        return '操作成功';
    }
  }
}
