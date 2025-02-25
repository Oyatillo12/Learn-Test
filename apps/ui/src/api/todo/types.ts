export type ITodo = {
    _id: string
    title: string
    isCompleted: boolean
}

export type AddTodo = Omit<ITodo, '_id'>

export type EditTodo = {
    id: string
    data: AddTodo
}

export type ChangeIsComplete = {
    data: {
        status: boolean
    }
    id: string
}
