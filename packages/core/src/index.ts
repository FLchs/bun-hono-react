export class ApiError extends Error {
  issues: string;
  message: string;
  constructor(message: string, issues: string) {
    super(message);
    this.issues = issues;
    this.message = message;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
