export interface ILog {
  _id: string;
  startTime: number;
  endTime: number;
  responseTime: number;
  operation: string;
  variables: any;
  response: any;
  headers: any;
  errorCode: string;
  errorMessage: string;
  query: string;
}
