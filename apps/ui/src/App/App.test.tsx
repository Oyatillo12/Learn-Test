import { render, screen } from '@testing-library/react'
import { App } from './App'

describe('App Component', () => {
    it('Renders App', () => {
        render(<App />)

        expect(screen.getByTestId('main-title')).toHaveTextContent(
            'Testing with Todo'
        )
    })
})
