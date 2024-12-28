import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { GqlArgumentsHost } from '@nestjs/graphql';
import { ErrorResponse } from '../errors/ErrorResponse.errors';

@Catch()
export class GraphQLExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    const context = gqlHost.getContext();
    const response = context.res;
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const errorDetail =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal Server Error';
    const devMessage =
      typeof errorDetail === 'string'
        ? errorDetail
        : (errorDetail as any).message || 'Unexpected error occurred';

    const errorResponse: ErrorResponse = {
      errorCode: status.toString(),
      devMessage: devMessage,
      data: gqlHost.getArgs(),
    };

    response.status(status).json(errorResponse);
  }
}
