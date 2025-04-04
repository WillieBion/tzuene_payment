export interface ResponseDTO<T = unknown> {
    statusCode: number
    message: T
}