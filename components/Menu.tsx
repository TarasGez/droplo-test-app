'use client'
import { FC, useState } from 'react'

import { MenuItemType } from '@/types/types'

import AddMenuForm from './AddForms/AddMenuForm'
import DraggableMenu from './DragAndDrop/DraggableMenu'
import EmptyMenu from './EmptyMenu'

interface MenuProps {
  items: MenuItemType[]
  handleAddNewItem: (newItem: MenuItemType, parentLabel: string | undefined) => void
  handleDeleteItem: (labelToDelete: string) => void
  handleEditItem: (oldItem: MenuItemType, updatedItem: MenuItemType) => void
}

const Menu: FC<MenuProps> = ({ items, handleAddNewItem, handleDeleteItem, handleEditItem }) => {
  const [isFormOpen, setIsFormOpen] = useState(false)

  const onAdd = (newMenuItem: MenuItemType) => {
    setIsFormOpen(false)
    handleAddNewItem(newMenuItem, undefined)
  }

  const emptyView = isFormOpen ? (
    <AddMenuForm onClose={() => setIsFormOpen(false)} onAdd={onAdd} />
  ) : (
    <EmptyMenu setIsFormOpen={setIsFormOpen} />
  )

  return (
    <div>
      {items.length > 0 ? (
        <DraggableMenu itemsList={items} onAdd={handleAddNewItem} onDelete={handleDeleteItem} onEdit={handleEditItem} />
      ) : (
        emptyView
      )}
    </div>
  )
}

export default Menu
