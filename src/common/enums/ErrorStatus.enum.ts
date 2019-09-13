export enum EErrorStatus {
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  NotAllowed = 405,
  Conflict = 409,
  PayloadTooLarge = 413,
  Validation = 422,
  FailedDependency = 424,
  TooManyRequests = 429,
  RetryWith = 449,
  InternalServerError = 500
}
