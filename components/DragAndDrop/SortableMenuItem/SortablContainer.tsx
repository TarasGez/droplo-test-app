'use client'
import { FC } from 'react'
import { closestCenter, DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

import { getClass } from '@/helpers/global'
import { MenuItemType, MenuType } from '@/types/types'

import SortableMenuItem from './SortableMenuItem'

interface SortablContainerProps {
  items: MenuItemType[]
  type: MenuType
  handleAddItem: (newItem: MenuItemType, parentLabel: string | undefined) => void
  handleEditItem: (oldItem: MenuItemType, updatedItem: MenuItemType) => void
  handleDeleteItem: (labelToDelete: string) => void
  handleDragEnd: (event: DragEndEvent) => void
  handleDragSubMenu: (parrent: string, items: MenuItemType[]) => void
  setActiveParent: (parentLabel: string | undefined) => void
}

const SortablContainer: FC<SortablContainerProps> = ({
  items,
  type,
  handleDragEnd,
  handleAddItem,
  handleEditItem,
  handleDeleteItem,
  handleDragSubMenu,
  setActiveParent,
}) => {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 10 } }))

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map((item) => item.label)} strategy={verticalListSortingStrategy}>
        <ul className={type} data-testid="sortable-list">
          {items.map((item, index) => (
            <SortableMenuItem
              key={item.label}
              item={item}
              onAdd={handleAddItem}
              onEdit={handleEditItem}
              onDelete={handleDeleteItem}
              onDrag={handleDragSubMenu}
              setActiveParent={setActiveParent}
              className={getClass(type, index, items.length, item.submenu.length)}
            />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  )
}

export default SortablContainer
