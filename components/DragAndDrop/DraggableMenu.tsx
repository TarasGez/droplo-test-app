'use client'
import { FC, useState } from 'react'
import { closestCenter, DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

import { MenuItemType } from '@/types/types'

import SubMenuForm from '../AddForms/SubMenuForm'

import SortableMenuItem from './SortableMenuItem'

interface DraggableMenuProps {
  itemsList: MenuItemType[]
  onAdd: (newItem: MenuItemType, parentLabel: string | undefined) => void
  onEdit: (oldItem: MenuItemType, updatedItem: MenuItemType) => void
  onDelete: (labelToDelete: string) => void
}

const DraggableMenu: FC<DraggableMenuProps> = ({ itemsList, onAdd, onEdit, onDelete }) => {
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
    if (!over || active.id === over.id) return

    const activeIndex = itemsList.findIndex((item) => item.label === active.id)
    const overIndex = itemsList.findIndex((item) => item.label === over.id)

    if (activeIndex !== -1 && overIndex !== -1) {
      const newOrder = arrayMove(itemsList, activeIndex, overIndex)
      console.log('newOrder', newOrder)
    }
  }

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 10 } }))

  return (
    <div>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={itemsList.map((item) => item.label)} strategy={verticalListSortingStrategy}>
          <ul>
            {itemsList.map((item) => (
              <SortableMenuItem
                key={item.label}
                item={item}
                onAdd={handleAddItem}
                onEdit={handleEditItem}
                onDelete={handleDeleteItem}
                setActiveParent={setActiveParent}
              />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
      {isFormOpen && <SubMenuForm type="add" onAdd={handleAddItem} onClose={() => setIsFormOpen(false)} />}

      <button
        onClick={() => setIsFormOpen(true)}
        className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Dodaj pozycję menu
      </button>
    </div>
  )
}

export default DraggableMenu