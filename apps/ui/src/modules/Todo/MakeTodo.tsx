import { AddTodo, ITodo, todoApi } from '@/api/todo'
import { Modal } from '@/components'
import {
    Dispatch,
    MouseEvent,
    SetStateAction,
    useEffect,
    useState,
} from 'react'

interface MakeTodoProps {
    openModal: boolean
    setOpenModal: Dispatch<SetStateAction<boolean>>
    getTodos: () => Promise<void>
    editTodo?: ITodo | null
}

export const MakeTodo = ({
    openModal,
    getTodos,
    setOpenModal,
    editTodo,
}: MakeTodoProps) => {
    const [title, setTitle] = useState('')
    const [isCompleted, setIsCompleted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (editTodo) {
            setTitle(editTodo.title)
            setIsCompleted(editTodo.isCompleted)
        }
    }, [editTodo])

    const handleSuccess = async () => {
        setOpenModal(false)
        await getTodos()
    }

    const handleSubmit = async (e: MouseEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)

        const todo: AddTodo = { isCompleted, title }
        try {
            const id = editTodo?._id
            if (id) {
                const res = await todoApi.updateTodo({ data: todo, id })
                console.log(res)
                if (res.success) {
                    handleSuccess()
                }
                return
            }
            const res = await todoApi.addTodo(todo)
            if (res.success) {
                handleSuccess()
            }
        } catch (err) {
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Modal
            title={editTodo ? 'Edit Todo' : 'Add Todo'}
            openModal={openModal}
            setOpenModal={setOpenModal}
        >
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 bg-white"
            >
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter todo..."
                    required
                    className="border p-2 rounded-md w-full outline-none focus:ring-2 focus:ring-[#0EB182]"
                />

                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="isCompleted"
                        checked={isCompleted}
                        onChange={(e) => setIsCompleted(e.target.checked)}
                        className="w-5 h-5"
                    />
                    Completed
                </label>

                <button
                    data-testid="submit-btn"
                    disabled={isLoading}
                    type="submit"
                    className="bg-[#0EB182] text-white px-4 py-2 rounded-lg hover:opacity-80 transition"
                >
                    {isLoading
                        ? 'Saving...'
                        : editTodo
                          ? 'Update Todo'
                          : 'Add Todo'}
                </button>
            </form>
        </Modal>
    )
}
