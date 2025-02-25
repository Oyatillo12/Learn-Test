import { X } from 'lucide-react'
import { Dispatch, FC, MouseEvent, ReactNode, SetStateAction } from 'react'

interface ModalProps {
    openModal: boolean
    setOpenModal: Dispatch<SetStateAction<boolean>>
    children: ReactNode
    title?: string
}

export const Modal: FC<ModalProps> = ({
    openModal,
    setOpenModal,
    children,
    title,
}) => {
    const handleClose = (e: MouseEvent<HTMLDivElement>) => {
        if ((e.target as HTMLElement).id === 'modal-outer') {
            setOpenModal(false)
        }
    }

    return (
        <div
            id="modal-outer"
            onClick={handleClose}
            className={`fixed inset-0 flex justify-center items-center bg-black/50 transition-all duration-500
                ${openModal ? 'scale-100' : 'scale-0'}`}
        >
            <div
                className={
                    'w-[500px] rounded-lg shadow-xl bg-white p-4 duration-300 '
                }
            >
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-[22px] font-bold">{title}</h2>
                    <button
                        onClick={() => setOpenModal(false)}
                        className="text-gray-500 hover:bg-gray-100 rounded-lg p-1"
                    >
                        <X size={24} />
                    </button>
                </div>
                {children}
            </div>
        </div>
    )
}
