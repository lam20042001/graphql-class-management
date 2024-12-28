export class ErrorResponse {
  errorCode: string;
  devMessage: string | object;
  data?: any;

  constructor(errorCode: string, devMessage: string, data?: any) {
    this.errorCode = errorCode;
    this.devMessage = devMessage;
    this.data = data;
  }
}
