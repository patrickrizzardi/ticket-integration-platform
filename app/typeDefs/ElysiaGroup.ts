interface IError {
  title: 'Error';
  description: string;
  stack?: string;
}

interface IErrorResponse {
  success: false;
  errors: Array<IError>;
  data?: Record<string, any>;
}

interface ISuccessResponse<T> {
  success: true;
  data?: T;
}

type THttpResponse<T> = IErrorResponse | ISuccessResponse<T>;

enum EStatusCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export { EStatusCode };

export type { IErrorResponse, THttpResponse };
