export class ApiError extends Error {
  message: string;
  issues?: string;
  constructor(message: string, issues?: string) {
    super(message);
    this.issues = issues;
    this.message = message;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
