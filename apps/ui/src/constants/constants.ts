export type IResponse<T> = {
    message?: string
    success: boolean
    data?: T
}

export type ISuccessRes = {
    success?: boolean
}

export const enum Endpoints {
    Todos = '/todos',
    Complete = '/complete',
}
