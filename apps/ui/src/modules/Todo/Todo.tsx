import { ITodo, todoApi } from '@/api/todo'
import { useEffect, useState } from 'react'
import { TodoItem } from './TodoItem'
import { MakeTodo } from './MakeTodo'

export const Todo = () => {
    const [todos, setTodos] = useState<ITodo[]>([])
    const [openModal, setOpenModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [editData, setEditData] = useState<ITodo | null>(null)

    const getTodos = async () => {
        try {
            setIsLoading(true)
            const res = await todoApi.getTodos()
            if (!res.data) return

            setTodos(res.data)
        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    const handleCrateStart = () => {
        setEditData(null)
        setOpenModal(true)
    }

    const handleDelete = async (id: string) => {
        try {
            if (window.confirm('Sure to delete Todo')) {
                const res = await todoApi.deleteTodos(id)

                if (res.success) {
                    await getTodos()
                }
            }
        } catch (err) {
            console.error(err)
        }
    }

    const handleEdit = (todo: ITodo) => {
        setOpenModal(true)
        setEditData(todo)
    }

    const handleChangeStatus = async (todo: ITodo) => {
        const changedStatus = {
            id: todo._id,
            data: {
                status: todo.isCompleted,
            },
        }
        try {
            const res = await todoApi.changeIsCompleted(changedStatus)
            if (res.success) {
                await getTodos()
            }
        } catch (error) {
            console.error('Failed to update todo', error)
        }
    }

    useEffect(() => {
        getTodos()
    }, [])

    return (
        <div className="flex flex-col gap-6 mt-8">
            <div className="flex items-center justify-between">
                <h2 className="text-[26px] font-bold">Todos</h2>
                <button
                    onClick={handleCrateStart}
                    className="bg-[#0EB182] text-white px-4 py-2 rounded-lg hover:opacity-70 duration-300"
                >
                    Create Todos
                </button>
            </div>
            {isLoading ? (
                <div className="flex justify-center items-center h-32">
                    <div className="animate-spin rounded-full h-10 w-10 border-4 border-t-[#0EB182] border-gray-200"></div>
                    <span className="ml-3 text-gray-600 text-lg">
                        Loading...
                    </span>
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {todos.length ? (
                        todos.map((item) => (
                            <TodoItem
                                onComplete={handleChangeStatus}
                                key={item._id}
                                todo={item}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        ))
                    ) : (
                        <p className="text-gray-500 text-center">
                            No todos found
                        </p>
                    )}
                </div>
            )}

            {openModal && (
                <MakeTodo
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    getTodos={getTodos}
                    editTodo={editData}
                />
            )}
        </div>
    )
}
