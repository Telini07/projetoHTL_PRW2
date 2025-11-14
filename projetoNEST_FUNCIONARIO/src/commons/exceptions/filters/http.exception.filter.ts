import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { sendHttpResponse } from '../../mensagem/send.response';
import { MensagemSistema } from '../../mensagem/mensagem.sistema';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    let status = 500;
    let message = 'Erro interno do servidor';
    let erro = null;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
      erro = exception.cause;
    } else if (exception instanceof Error) {
      message = exception.message;
      erro = exception.stack;
    } else {
      message = 'Erro desconhecido';
      erro = String(exception);
    }

    return sendHttpResponse(res, status, message, null, req.path, erro);
  }
}
