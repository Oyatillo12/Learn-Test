import { fireEvent, render, screen } from '@testing-library/react'
import { Modal } from '../Modal'
import { act } from 'react'

describe('Modal Component', () => {
    const mockSetOpenModal = vi.fn()
    it('Renders with title and children', () => {
        render(
            <Modal
                openModal={true}
                setOpenModal={mockSetOpenModal}
                title="Test modal"
            >
                <p>Modal Content</p>
            </Modal>
        )

        expect(screen.getByTestId('modal-title')).toHaveTextContent(
            'Test modal'
        )
        expect(screen.getByText('Modal Content')).toBeInTheDocument()
    })

    it('close when the btn clicked', () => {
        render(<Modal openModal={true} setOpenModal={mockSetOpenModal} />)

        act(() => {
            fireEvent.click(screen.getByTestId('modal-close-btn'))
        })

        expect(mockSetOpenModal).toHaveBeenCalledWith(false)
    })

    it('close when outside clicked', () => {
        render(<Modal openModal={true} setOpenModal={mockSetOpenModal} />)

        fireEvent.click(screen.getByTestId('modal-outer'))

        expect(mockSetOpenModal).toHaveBeenCalledWith(false)
    })
})
