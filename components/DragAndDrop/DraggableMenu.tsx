'use client'
import { FC, useState } from 'react'
import { closestCenter, DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

import AddMenuForm from '@/components/AddMenuForm'
import { dragMenuItem, getItemClass, updateSubMenu } from '@/helpers/global'
import { MenuItemType } from '@/types/types'

import SortableMenuItem from './SortableMenuItem'

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
    const newOrder = updateSubMenu(itemsList, parrent, newSubMenu)
    if (newOrder) {
      onDrag(newOrder)
    }
  }

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 10 } }))

  return (
    <div className="card">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={itemsList.map((item) => item.label)} strategy={verticalListSortingStrategy}>
          <ul className="menu">
            {itemsList.map((item, index) => (
              <SortableMenuItem
                key={item.label}
                item={item}
                onAdd={handleAddItem}
                onEdit={handleEditItem}
                onDelete={handleDeleteItem}
                onDrag={handleDragSubMenu}
                setActiveParent={setActiveParent}
                className={getItemClass(index, itemsList.length, item.submenu.length)}
              />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
      {isFormOpen && <AddMenuForm type="add" onAdd={handleAddItem} onClose={() => setIsFormOpen(false)} />}

      <button onClick={() => setIsFormOpen(true)} className="btn-add">
        Dodaj pozycję menu
      </button>
    </div>
  )
}

export default DraggableMenu
