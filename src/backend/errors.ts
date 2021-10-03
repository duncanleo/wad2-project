export class ErrorRequest extends Error {
  statusCode: number;

  constructor(message?: string) {
    super(message);
    this.statusCode = 400;
  }
}

export class ErrorUnauthorized extends ErrorRequest {
  constructor(message = 'Unauthorized') {
    super(message);
    this.statusCode = 401;
  }
}

export class ErrorBadRequest extends ErrorRequest {
  constructor(message = 'Bad Request') {
    super(message);
    this.statusCode = 400;
  }
}

export class ErrorForbidden extends ErrorRequest {
  constructor(message = 'Forbidden') {
    super(message);
    this.statusCode = 403;
  }
}

export class ErrorNotFound extends ErrorRequest {
  constructor(message = 'Not Found') {
    super(message);
    this.statusCode = 404;
  }
}

export class ErrorInternalServerError extends ErrorRequest {
  constructor(message = 'Internal Server Error') {
    super(message);
    this.statusCode = 500;
  }
}
