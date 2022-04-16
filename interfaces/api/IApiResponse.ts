export interface IApiResponse<T> {
    statusCode: number
    message: string
    data: T | null
}