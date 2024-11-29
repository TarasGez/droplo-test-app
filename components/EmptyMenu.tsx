'use client'
import { FC } from 'react'

import PlusCircleIcon from './icons/PlusCircleIcon'

interface EmptyMenuProps {
  setIsFormOpen: (arg: boolean) => void
}

const EmptyMenu: FC<EmptyMenuProps> = ({ setIsFormOpen }) => {
  return (
    <div className="flex w-full flex-col items-center rounded-lg bg-gray-50 py-12 shadow-md">
      <>
        <p className="mb-4 text-lg text-gray-600">Menu jest puste</p>
        <p className="mb-6 text-gray-500">W tym menu nie ma jeszcze żadnych linków.</p>
      </>
      <button onClick={() => setIsFormOpen(true)} className="btn-primary">
        <PlusCircleIcon />
        Dodaj pozycję menu
      </button>
    </div>
  )
}

export default EmptyMenu
