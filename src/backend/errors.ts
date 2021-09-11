export class ErrorRequest extends Error {
  statusCode: number;

  constructor(message?: string) {
    super(message);
    this.statusCode = 400;
  }
}

export class ErrorUnauthorized extends ErrorRequest {
  constructor(message?: string) {
    super(message);
    this.statusCode = 401;
  }
}

export class ErrorBadRequest extends ErrorRequest {
  constructor(message?: string) {
    super(message);
    this.statusCode = 400;
  }
}

export class ErrorNotFound extends ErrorRequest {
  constructor(message?: string) {
    super(message);
    this.statusCode = 404;
  }
}

export class ErrorInternalServerError extends ErrorRequest {
  constructor(message?: string) {
    super(message);
    this.statusCode = 500;
  }
}
