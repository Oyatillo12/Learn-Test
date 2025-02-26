import { render, screen, waitFor } from '@testing-library/react'
import { Todo } from '../Todo'
import { todoApi } from '@/api/todo'
import { Mock } from 'vitest'

vi.mock('@/api/todo', () => ({
    todoApi: {
        getTodos: vi.fn(),
        deleteTodos: vi.fn(),
        changeIsCompleted: vi.fn(),
    },
}))

describe('Todo Component', () => {
    it('renders title and "Create Todos" button', () => {
        render(<Todo />)
        const btn = screen.getByTestId('todo-create-btn')
        const title = screen.getByTestId('todo-title')

        expect(title).toHaveTextContent('Todos')
        expect(btn).toHaveTextContent('Create Todos')
    })

    it('Displays Loading while fetching todos', async () => {
        ;(todoApi.getTodos as Mock).mockImplementationOnce(
            () =>
                new Promise((resolve) =>
                    setTimeout(() => resolve({ data: [] }), 500)
                )
        )
        render(<Todo />)

        expect(screen.getByTestId('todo-loading')).toBeInTheDocument()

        await waitFor(() =>
            expect(screen.queryByTestId('todo-loading')).not.toBeInTheDocument()
        )
    })

    it('renders todo from API', async () => {
        const mockTodos = [
            { _id: '1', title: 'Learn test', isCompleted: false },
            { _id: '2', title: 'Write tests', isCompleted: true },
        ]

        ;(todoApi.getTodos as Mock).mockResolvedValue({ data: mockTodos })

        render(<Todo />)

        await waitFor(() => {
            expect(screen.getByText('Learn test')).toBeInTheDocument()
            expect(screen.getByText('Write tests')).toBeInTheDocument()
        })
    })

    it('Shows "No todos found", when API returns empty data', async () => {
        ;(todoApi.getTodos as Mock).mockResolvedValue({ data: [] })

        render(<Todo />)

        await waitFor(() => {
            expect(screen.getByTestId('todo-empty')).toBeInTheDocument()
        })
    })
})
