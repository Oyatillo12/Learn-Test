import { Endpoints, IResponse, ISuccessRes } from '@/constants'
import { Instance } from '../instance'
import { AddTodo, ChangeIsComplete, EditTodo, ITodo } from './types'

class TodosApi extends Instance {
    constructor() {
        super()
    }

    getTodos = (): Promise<IResponse<ITodo[]>> => this.get(Endpoints.Todos)

    deleteTodos = (id: string): Promise<IResponse<ISuccessRes>> =>
        this.delete(`${Endpoints.Todos}/${id}`)

    addTodo = (params: AddTodo): Promise<IResponse<ISuccessRes>> =>
        this.post(Endpoints.Todos, params)

    updateTodo = (params: EditTodo): Promise<IResponse<ISuccessRes>> =>
        this.put(`${Endpoints.Todos}/${params.id}`, params.data)

    changeIsCompleted = (
        params: ChangeIsComplete
    ): Promise<IResponse<ISuccessRes>> =>
        this.put(
            `${Endpoints.Todos}${Endpoints.Complete}/${params.id}`,
            params.data
        )
}

export const todoApi = new TodosApi()
