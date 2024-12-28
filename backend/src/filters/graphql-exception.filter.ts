import { Catch, ArgumentsHost } from '@nestjs/common';
import { GqlExceptionFilter } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';

@Catch()
export class GraphQLErrorFilter implements GqlExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    return new GraphQLError(exception.message, {
      extensions: {
        errorCode: exception.status || 500,
        devMessage: exception.message || 'Internal server error',
        data: exception.response?.data || null
      }
    });
  }
}