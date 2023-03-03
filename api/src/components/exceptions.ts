export class HttpException extends Error {
  code: number
  message: string

  constructor(code: number, message: string = "Service Error") {
    super()
    this.code = code
    this.message = message
  }
}
