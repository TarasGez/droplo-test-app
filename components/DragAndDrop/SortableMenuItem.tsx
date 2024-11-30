'use client'
import { FC, useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { FormType, FormTypes, MenuItemType } from '@/types/types'

import AddMenuForm from '../AddMenuForm'
import MoveIcon from '../icons/MoveIcon'

const ADD = FormTypes.ADD
const EDIT = FormTypes.EDIT

interface SortableMenuItemProps {
  item: MenuItemType
  onAdd: (newItem: MenuItemType, parentLabel: string | undefined) => void
  onEdit: (oldItem: MenuItemType, updatedItem: MenuItemType) => void
  onDelete: (labelToDelete: string) => void
  setActiveParent: (parentLabel: string | undefined) => void
  className?: string
}

const SortableMenuItem: FC<SortableMenuItemProps> = ({ item, onAdd, onEdit, onDelete, setActiveParent, className }) => {
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

  return (
    <li ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div className={className}>
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
        <AddMenuForm
          type={typeForm}
          item={item}
          parent={activeParent}
          onAdd={handleAddItem}
          onEdit={handleEditItem}
          onClose={() => setIsFormOpen(false)}
        />
      )}

      {item.submenu.length > 0 && (
        <ul className="sub-menu">
          {item.submenu.map((sub, index) => (
            <SortableMenuItem
              key={sub.label}
              item={sub}
              onAdd={onAdd}
              onEdit={onEdit}
              onDelete={onDelete}
              setActiveParent={setActiveParent}
              className={
                index === 0 && item.submenu.length === 1
                  ? 'sub-item-single'
                  : index === item.submenu.length - 1
                    ? 'sub-item-last'
                    : 'sub-item'
              }
            />
          ))}
        </ul>
      )}
    </li>
  )
}

export default SortableMenuItem
