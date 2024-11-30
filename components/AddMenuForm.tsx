'use client'
import { FC, FormEvent, useState } from 'react'

import { FormType, FormTypes, MenuItemType } from '@/types/types'

import SearchIcon from './icons/SearchIcon'
import TrashIcon from './icons/TrashIcon'

interface AddMenuFormProps {
  type: FormType
  item?: MenuItemType
  parent?: string
  onAdd: (newItem: MenuItemType, parentLabel: string | undefined) => void
  onEdit?: (oldItem: MenuItemType, updatedItem: MenuItemType) => void
  onClose: () => void
}

const ADD = FormTypes.ADD
const EDIT = FormTypes.EDIT

const AddMenuForm: FC<AddMenuFormProps> = ({ type = ADD, item, parent, onAdd, onEdit, onClose }) => {
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
    <form onSubmit={handleSubmit} className="form">
      <div className="flex-1">
        <div>
          <label htmlFor="label" className="form-label">
            Nazwa
          </label>
          <input
            type="text"
            id="label"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="form-input"
            placeholder="np. Promocje"
            required
          />
        </div>
        <div>
          <label htmlFor="link" className="form-label">
            Link (opcjonalnie)
          </label>

          <div className="form-input flex items-center gap-2">
            <label htmlFor="link" className="form-label">
              <SearchIcon className="text-quaternary" />
            </label>
            <input
              type="url"
              id="link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="flex-1 border-none outline-none focus:ring-0"
              placeholder="Wklej lub wyszukaj"
            />
          </div>
        </div>
        <div className="btns">
          <button type="button" className="btn" onClick={onClose}>
            Anuluj
          </button>
          <button type="submit" className="btn text-secondary-button">
            Dodaj
          </button>
        </div>
      </div>
      <div className="w-10 p-2.5" role="button" tabIndex={0} onClick={onClose} onKeyDown={onClose}>
        <TrashIcon />
      </div>
    </form>
  )
}

export default AddMenuForm
