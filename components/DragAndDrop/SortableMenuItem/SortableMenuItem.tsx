'use client'
import { FC, useState } from 'react'
import { DragEndEvent } from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import AddMenuForm from '@/components/AddMenuForm'
import MoveIcon from '@/components/icons/MoveIcon'
import { dragMenuItem } from '@/helpers/dndHelpers'
import { FormType, FormTypes, MenuItemType, MenuTypes } from '@/types/types'

import SortablContainer from './SortablContainer'

const ADD = FormTypes.ADD
const EDIT = FormTypes.EDIT

interface SortableMenuItemProps {
  item: MenuItemType
  onAdd: (newItem: MenuItemType, parentLabel: string | undefined) => void
  onEdit: (oldItem: MenuItemType, updatedItem: MenuItemType) => void
  onDelete: (labelToDelete: string) => void
  onDrag: (parrent: string, items: MenuItemType[]) => void
  setActiveParent: (parentLabel: string | undefined) => void
  className: string
}

const SortableMenuItem: FC<SortableMenuItemProps> = ({
  item,
  onAdd,
  onEdit,
  onDelete,
  onDrag,
  setActiveParent,
  className,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: item.label,
  })

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [activeParent, _setActiveParent] = useState<string | undefined>(undefined)
  const [typeForm, setTypeForm] = useState<FormType>(ADD)

  const handleOpenAddForm = () => {
    setTypeForm(ADD)
    _setActiveParent(item.label)
    setActiveParent(item.label)
    setIsFormOpen(true)
  }

  const handleOpenEditForm = () => {
    setTypeForm(EDIT)
    setIsFormOpen(true)
  }

  const handleAddItem = (newItem: MenuItemType) => {
    setActiveParent(item.label)
    onAdd(newItem, item.label)
    setIsFormOpen(false)
  }

  const handleEditItem = (item: MenuItemType, newItem: MenuItemType) => {
    onEdit(item, newItem)
    setIsFormOpen(false)
  }

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    const newOrder = dragMenuItem(item.submenu, active, over)
    if (newOrder) {
      onDrag(item.label, newOrder)
    }
  }

  const _className = isFormOpen && className.includes('menu-item') ? `${className} border-b` : className

  return (
    <li ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div className={_className} data-testid="sortable-item">
        <div className="menu-item-data">
          <div className="icon">
            <MoveIcon className="text-tertiary" />
          </div>
          <div className="menu-item-text">
            <h6>{item.label}</h6>
            {item.link && (
              <a href={item.link} className="menu-item-link">
                {item.link}
              </a>
            )}
          </div>
        </div>
        <div className="btn-group">
          <button onClick={() => onDelete(item.label)} className="btn-action">
            Usuń
          </button>
          <button onClick={handleOpenEditForm} className="btn-action">
            Edytuj
          </button>
          <button onClick={handleOpenAddForm} className="btn-action">
            Dodaj pozycję menu
          </button>
        </div>
      </div>

      {isFormOpen && (
        <div className="form-container">
          <AddMenuForm
            type={typeForm}
            item={item}
            parent={activeParent}
            onAdd={handleAddItem}
            onEdit={handleEditItem}
            onClose={() => setIsFormOpen(false)}
          />
        </div>
      )}

      {item.submenu.length > 0 && (
        <SortablContainer
          items={item.submenu}
          type={MenuTypes.SUBMENU}
          handleDragEnd={handleDragEnd}
          handleAddItem={handleAddItem}
          handleEditItem={handleEditItem}
          handleDeleteItem={onDelete}
          handleDragSubMenu={onDrag}
          setActiveParent={setActiveParent}
        />
      )}
    </li>
  )
}

export default SortableMenuItem
