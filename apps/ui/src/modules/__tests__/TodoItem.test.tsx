import { ITodo } from '@/api/todo'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { TodoItem } from '../Todo/TodoItem'

describe('TodoItem Component', () => {
    const mockTodo: ITodo = {
        _id: '1',
        title: 'Test todo',
        isCompleted: false,
    }

    it('renders todo', () => {
        render(
            <TodoItem
                todo={mockTodo}
                onDelete={vi.fn()}
                onEdit={vi.fn()}
                onComplete={vi.fn()}
            />
        )

        expect(screen.getByText('Test todo')).toBeInTheDocument()
    })
    it('calls onDelete, onEdit, and onComplete with correct values', async () => {
        const mockOnDelete = vi.fn()
        const mockOnEdit = vi.fn()
        const mockOnComplete = vi.fn()

        render(
            <TodoItem
                todo={mockTodo}
                onDelete={mockOnDelete}
                onEdit={mockOnEdit}
                onComplete={mockOnComplete}
            />
        )

        const deleteBtn = screen.getByTestId('delete-todo-btn')
        fireEvent.click(deleteBtn)

        const editBtn = screen.getByTestId('edit-todo-btn')
        fireEvent.click(editBtn)

        const completeBtn = screen.getByTestId('complete-todo-btn')
        fireEvent.click(completeBtn)

        await waitFor(() => {
            expect(mockOnDelete).toHaveBeenCalledWith(
                mockTodo._id,
                expect.any(Object)
            )
            expect(mockOnEdit).toHaveBeenCalledWith(
                mockTodo,
                expect.any(Object)
            )
            expect(mockOnComplete).toHaveBeenCalledWith(
                { ...mockTodo, isCompleted: true },
                expect.any(Object)
            )
        })
    })
})
