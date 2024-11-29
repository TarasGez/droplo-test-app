'use client'
import { FC, useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { FormType, FormTypes, MenuItemType } from '@/types/types'

import SubMenuForm from '../AddForms/SubMenuForm'

const ADD = FormTypes.ADD
const EDIT = FormTypes.EDIT

interface SortableMenuItemProps {
  item: MenuItemType
  onAdd: (newItem: MenuItemType, parentLabel: string | undefined) => void
  onEdit: (oldItem: MenuItemType, updatedItem: MenuItemType) => void
  onDelete: (labelToDelete: string) => void
  setActiveParent: (parentLabel: string | undefined) => void
}

const SortableMenuItem: FC<SortableMenuItemProps> = ({ item, onAdd, onEdit, onDelete, setActiveParent }) => {
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
    <li ref={setNodeRef} style={style} {...attributes} {...listeners} className="flex flex-col">
      <div className="border-primary rounded-b-lg border border-solid bg-white p-4 first:rounded-b-none first:rounded-t">
        <div>
          <p className="font-bold">{item.label}</p>
          {item.link && (
            <a href={item.link} className="text-blue-500 hover:underline">
              {item.link}
            </a>
          )}
        </div>
        <div className="flex space-x-2">
          <button onClick={() => onDelete(item.label)} className="text-sm text-red-500 hover:underline">
            Usuń
          </button>
          <button onClick={handleOpenEditForm} className="text-sm text-red-500 hover:underline">
            Edytuj
          </button>
          <button onClick={handleOpenAddForm} className="text-sm text-green-500 hover:underline">
            Dodaj pozycję menu
          </button>
        </div>
      </div>

      {isFormOpen && (
        <SubMenuForm
          type={typeForm}
          item={item}
          parent={activeParent}
          onAdd={handleAddItem}
          onEdit={handleEditItem}
          onClose={() => setIsFormOpen(false)}
        />
      )}

      {item.submenu.length > 0 && (
        <ul className="ml-16">
          {item.submenu.map((sub) => (
            <SortableMenuItem
              key={sub.label}
              item={sub}
              onAdd={onAdd}
              onEdit={onEdit}
              onDelete={onDelete}
              setActiveParent={setActiveParent}
            />
          ))}
        </ul>
      )}
    </li>
  )
}

export default SortableMenuItem
