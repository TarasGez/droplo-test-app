'use client'
import { FC, FormEvent, useState } from 'react'

import { FormType, FormTypes, MenuItemType } from '@/types/types'

interface SubMenuFormProps {
  type: FormType
  item?: MenuItemType
  parent?: string
  onAdd: (newItem: MenuItemType, parentLabel: string | undefined) => void
  onEdit?: (oldItem: MenuItemType, updatedItem: MenuItemType) => void
  onClose: () => void
}

const ADD = FormTypes.ADD
const EDIT = FormTypes.EDIT

const SubMenuForm: FC<SubMenuFormProps> = ({ type = ADD, item, parent, onAdd, onEdit, onClose }) => {
  const [label, setLabel] = useState((type === EDIT && item?.label) || '')
  const [link, setLink] = useState((type === EDIT && item?.link) || '')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const newMenuItem = { label, link, submenu: [] }

    if (type === EDIT && item && onEdit) {
      onEdit(item, newMenuItem)
    } else {
      onAdd(newMenuItem, parent || undefined)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="label" className="block text-sm font-medium text-gray-700">
          Nazwa pozycji menu
        </label>
        <input
          type="text"
          id="label"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="Wprowadź nazwę pozycji"
          required
        />
      </div>
      <div>
        <label htmlFor="link" className="block text-sm font-medium text-gray-700">
          Link (opcjonalnie)
        </label>
        <input
          type="url"
          id="link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="Wprowadź link"
        />
      </div>
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          className="rounded-md bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
          onClick={onClose}
        >
          Anuluj
        </button>
        <button type="submit" className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
          Dodaj
        </button>
      </div>
    </form>
  )
}

export default SubMenuForm
