import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { todoApi } from '@/api/todo'
import { Mock, vi } from 'vitest'
import { MakeTodo } from '../Todo/MakeTodo'

vi.mock('@/api/todo', () => ({
    todoApi: {
        addTodo: vi.fn(),
        updateTodo: vi.fn(),
    },
}))

describe('MakeTodo Component', () => {
    const mockSetOpenModal = vi.fn()
    const mockGetTodos = vi.fn()
    const mockTodo = { _id: '1', title: 'Test Todo', isCompleted: true }

    it('renders correctly with Add Todo title when adding a new todo', () => {
        render(
            <MakeTodo
                openModal={true}
                setOpenModal={mockSetOpenModal}
                getTodos={mockGetTodos}
            />
        )

        expect(screen.getByTestId('modal-title')).toHaveTextContent('Add Todo')
        expect(screen.getByPlaceholderText('Enter todo...')).toHaveValue('')
    })

    it('renders correctly with Edit Todo title when editing a todo', () => {
        render(
            <MakeTodo
                openModal={true}
                setOpenModal={mockSetOpenModal}
                getTodos={mockGetTodos}
                editTodo={mockTodo}
            />
        )

        expect(screen.getByText('Edit Todo')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Enter todo...')).toHaveValue(
            'Test Todo'
        )
        expect(screen.getByRole('checkbox')).toBeChecked()
    })

    it('updates input field on user input', () => {
        render(
            <MakeTodo
                openModal={true}
                setOpenModal={mockSetOpenModal}
                getTodos={mockGetTodos}
            />
        )

        const input = screen.getByPlaceholderText('Enter todo...')
        act(() => {
            fireEvent.change(input, { target: { value: 'New Todo' } })
        })

        expect(input).toHaveValue('New Todo')
    })

    it('toggles checkbox on user click', () => {
        render(
            <MakeTodo
                openModal={true}
                setOpenModal={mockSetOpenModal}
                getTodos={mockGetTodos}
            />
        )

        const checkbox = screen.getByRole('checkbox')
        act(() => {
            fireEvent.click(checkbox)
        })

        expect(checkbox).toBeChecked()
    })

    it('calls addTodo API when adding a new todo', async () => {
        ;(todoApi.addTodo as Mock).mockResolvedValue({ success: true })

        render(
            <MakeTodo
                openModal={true}
                setOpenModal={mockSetOpenModal}
                getTodos={mockGetTodos}
            />
        )

        act(() => {
            fireEvent.change(screen.getByPlaceholderText('Enter todo...'), {
                target: { value: 'New Todo' },
            })
            fireEvent.click(screen.getByTestId('submit-btn'))
        })

        await waitFor(() =>
            expect(todoApi.addTodo).toHaveBeenCalledWith({
                title: 'New Todo',
                isCompleted: false,
            })
        )
        await waitFor(() => expect(mockGetTodos).toHaveBeenCalled())
        await waitFor(() =>
            expect(mockSetOpenModal).toHaveBeenCalledWith(false)
        )
    })

    it('calls updateTodo API when editing a todo', async () => {
        ;(todoApi.updateTodo as Mock).mockResolvedValue({ success: true })

        render(
            <MakeTodo
                openModal={true}
                setOpenModal={mockSetOpenModal}
                getTodos={mockGetTodos}
                editTodo={mockTodo}
            />
        )

        act(() => {
            fireEvent.change(screen.getByPlaceholderText('Enter todo...'), {
                target: { value: 'Updated Todo' },
            })
            fireEvent.click(screen.getByRole('checkbox'))
            fireEvent.click(screen.getByTestId('submit-btn'))
        })

        await waitFor(() =>
            expect(todoApi.updateTodo).toHaveBeenCalledWith({
                data: { title: 'Updated Todo', isCompleted: false },
                id: mockTodo._id,
            })
        )
        await waitFor(() => expect(mockGetTodos).toHaveBeenCalled())
        await waitFor(() =>
            expect(mockSetOpenModal).toHaveBeenCalledWith(false)
        )
    })

    it("displays 'Saving...' when submitting", async () => {
        ;(todoApi.addTodo as Mock).mockResolvedValue({ success: true })

        render(
            <MakeTodo
                openModal={true}
                setOpenModal={mockSetOpenModal}
                getTodos={mockGetTodos}
            />
        )

        const btn = screen.getByTestId('submit-btn')
        act(() => {
            fireEvent.change(screen.getByPlaceholderText('Enter todo...'), {
                target: { value: 'New Todo' },
            })
            fireEvent.click(btn)
        })

        expect(btn).toHaveTextContent('Saving...')
    })
})
