'use client'
import { FC } from 'react'

import PlusCircleIcon from './icons/PlusCircleIcon'

interface EmptyMenuProps {
  setIsFormOpen: (arg: boolean) => void
}

const EmptyMenu: FC<EmptyMenuProps> = ({ setIsFormOpen }) => {
  return (
    <div className="empty-menu">
      <h5>Menu jest puste</h5>
      <p className="empty-menu-text">W tym menu nie ma jeszcze żadnych linków.</p>
      <button onClick={() => setIsFormOpen(true)} className="btn-primary">
        <PlusCircleIcon className="text-primary-bg" />
        Dodaj pozycję menu
      </button>
    </div>
  )
}

export default EmptyMenu
