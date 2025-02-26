import { Todo } from '@/modules/Todo'
import '@/styles/global.css'

export const App = () => {
    return (
        <div className="max-w-5xl mx-auto mt-6">
            <h1
                data-testid="main-title"
                className="text-center text-[30px] font-bold"
            >
                Testing with Todo
            </h1>

            <Todo />
        </div>
    )
}
