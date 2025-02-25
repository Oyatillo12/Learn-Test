export interface IResponse<T> {
    message?: string
    success: boolean
    data?: T
}

export interface ISuccessRes {
    success?: boolean
}
