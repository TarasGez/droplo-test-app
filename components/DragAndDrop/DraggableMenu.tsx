'use client'
import { FC, useState } from 'react'
import { DragEndEvent } from '@dnd-kit/core'

import AddMenuForm from '@/components/AddMenuForm'
import { dragMenuItem, dragSubMenuItem } from '@/helpers/dndHelpers'
import { FormTypes, MenuItemType, MenuTypes } from '@/types/types'

import SortablContainer from './SortableMenuItem'

interface DraggableMenuProps {
  itemsList: MenuItemType[]
  onAdd: (newItem: MenuItemType, parentLabel: string | undefined) => void
  onEdit: (oldItem: MenuItemType, updatedItem: MenuItemType) => void
  onDelete: (labelToDelete: string) => void
  onDrag: (items: MenuItemType[]) => void
}

const DraggableMenu: FC<DraggableMenuProps> = ({ itemsList, onAdd, onEdit, onDelete, onDrag }) => {
  const [activeParent, setActiveParent] = useState<string | undefined>(undefined)
  const [isFormOpen, setIsFormOpen] = useState(false)

  const setClose = () => {
    setIsFormOpen(false)
    setActiveParent(undefined)
  }

  const handleAddItem = (newItem: MenuItemType) => {
    onAdd(newItem, activeParent)
    setClose()
  }

  const handleEditItem = (item: MenuItemType, newItem: MenuItemType) => {
    onEdit(item, newItem)
    setClose()
  }

  const handleDeleteItem = (labelToDelete: string) => {
    onDelete(labelToDelete)
    setClose()
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    const newOrder = dragMenuItem(itemsList, active, over)
    if (newOrder) {
      onDrag(newOrder)
    }
  }

  const handleDragSubMenu = (parrent: string, newSubMenu: MenuItemType[]) => {
    const newOrder = dragSubMenuItem(itemsList, parrent, newSubMenu)
    if (newOrder) {
      onDrag(newOrder)
    }
  }

  return (
    <div className="card">
      <SortablContainer
        items={itemsList}
        type={MenuTypes.MENU}
        handleDragEnd={handleDragEnd}
        handleAddItem={handleAddItem}
        handleEditItem={handleEditItem}
        handleDeleteItem={handleDeleteItem}
        handleDragSubMenu={handleDragSubMenu}
        setActiveParent={setActiveParent}
      />

      <div className="form-add-container">
        {isFormOpen && <AddMenuForm type={FormTypes.ADD} onAdd={handleAddItem} onClose={() => setIsFormOpen(false)} />}

        <button onClick={() => setIsFormOpen(true)} className="btn-add">
          Dodaj pozycję menu
        </button>
      </div>
    </div>
  )
}

export default DraggableMenu
