import axios, { AxiosInstance } from 'axios'

export class Instance {
    protected readonly instance: AxiosInstance

    constructor() {
        const baseURL = 'http://localhost:3000'

        this.instance = axios.create({ baseURL })
    }

    public async get<T>(url: string) {
        const { data } = await this.instance.get<T>(url)

        return data
    }

    public async post<T>(url: string, params: unknown) {
        const { data } = await this.instance.post<T>(url, params)

        return data
    }

    public async delete<T>(url: string) {
        const { data } = await this.instance.delete<T>(url)

        return data
    }

    public async put<T>(url: string, params: unknown) {
        const { data } = await this.instance.put<T>(url, params)

        return data
    }
}
