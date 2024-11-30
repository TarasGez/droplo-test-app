'use client'
import { FC, useState } from 'react'

import { MenuItemType } from '@/types/types'

import DraggableMenu from './DragAndDrop/DraggableMenu'
import AddMenuForm from './AddMenuForm'
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
    <AddMenuForm type="add" onAdd={onAdd} onClose={() => setIsFormOpen(false)} />
  ) : (
    <EmptyMenu setIsFormOpen={setIsFormOpen} />
  )

  return (
    <>
      {items.length > 0 ? (
        <DraggableMenu itemsList={items} onAdd={handleAddNewItem} onDelete={handleDeleteItem} onEdit={handleEditItem} />
      ) : (
        emptyView
      )}
    </>
  )
}

export default Menu
