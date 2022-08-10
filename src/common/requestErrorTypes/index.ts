export type RequestErrorsType =
  | 'Not Found'
  | 'bad getway'
  | 'Unauthorized'
  | 'Bad Request'
  | 'Forbidden'
  | 'Unprocessable Entity'
  | 'Internal Server Error';

export function createRequestError(error: RequestErrorsType) {
  return error;
}
