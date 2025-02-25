import { ITodo } from '@/api/todo'
import { CheckCircle, Circle, Pencil, Trash2 } from 'lucide-react'

interface TodoItemProps {
    todo: ITodo
    onEdit: (todo: ITodo) => void
    onDelete: (id: string) => Promise<void>
    onComplete: (todo: ITodo) => Promise<void>
}

export const TodoItem = ({
    todo,
    onDelete,
    onEdit,
    onComplete,
}: TodoItemProps) => {
    return (
        <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
            <div className="flex items-center gap-3">
                <button
                    onClick={onComplete.bind(null, {
                        ...todo,
                        isCompleted: !todo.isCompleted,
                    })}
                    data-testid="complete-todo-btn"
                >
                    {todo.isCompleted ? (
                        <CheckCircle className="text-[#0EB182] w-6 h-6 cursor-pointer" />
                    ) : (
                        <Circle className="text-gray-400 w-6 h-6 cursor-pointer" />
                    )}
                </button>
                <h3
                    className={`text-lg font-semibold ${
                        todo.isCompleted
                            ? 'line-through text-gray-500'
                            : 'text-gray-900'
                    }`}
                >
                    {todo.title}
                </h3>
            </div>

            <div className="flex items-center gap-2">
                <button
                    data-testid="edit-todo-btn"
                    onClick={onEdit.bind(null, todo)}
                    className="p-2 cursor-pointer rounded-lg bg-[#0EB182] hover:opacity-70 transition"
                >
                    <Pencil className="w-5 h-5 text-white" />
                </button>

                <button
                    data-testid="delete-todo-btn"
                    onClick={onDelete.bind(null, todo._id)}
                    className="p-2 cursor-pointer rounded-lg bg-[#FC7857] hover:opacity-70 transition"
                >
                    <Trash2 className="w-5 h-5 text-white" />
                </button>
            </div>
        </div>
    )
}
