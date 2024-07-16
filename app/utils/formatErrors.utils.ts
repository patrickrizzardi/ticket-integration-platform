import type { Context } from 'elysia';
import type { IErrorResponse } from 'root/typeDefs/ElysiaGroup.ts';
import { EStatusCode } from 'root/typeDefs/ElysiaGroup.ts';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default (errors: any, statusCode?: { set: Context['set']; status: EStatusCode }): IErrorResponse => {
  if (statusCode) statusCode.set.status = statusCode.status;

  if (statusCode && statusCode.status === EStatusCode.INTERNAL_SERVER_ERROR && Bun.env.NODE_ENV === 'production') {
    return {
      success: false,
      errors: [
        {
          title: 'Error',
          description: 'Internal server error',
        },
      ],
    };
  }

  const errorResponse: IErrorResponse = {
    success: false,
    errors: [],
  };

  if (typeof errors === 'string') {
    errorResponse.errors.push({
      title: 'Error',
      description: errors,
    });

    return errorResponse;
  }

  if (errors instanceof Error) {
    errorResponse.errors.push({
      title: 'Error',
      description: errors.message,
    });
  }

  return errorResponse;
};
