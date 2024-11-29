'use client'
import { FC, FormEvent, useState } from 'react'
import Link from 'next/link'

import { MenuItemType } from '@/types/types'

interface AddMenuFormProps {
  onClose: () => void
  onAdd: (newItem: MenuItemType) => void
}

const AddMenuForm: FC<AddMenuFormProps> = ({ onAdd, onClose }) => {
  const [label, setLabel] = useState('')
  const [link, setLink] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const newMenuItem = { label, link, submenu: [] }

    onAdd(newMenuItem)
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100 px-4 py-8">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-md">
        <header className="mb-6">
          <h1 className="mb-4 text-2xl font-bold text-gray-800">Dodaj pozycję menu</h1>
          <Link href="/navigation" className="text-blue-500 hover:underline">
            Wróć do listy nawigacji
          </Link>
        </header>
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
      </div>
    </div>
  )
}

export default AddMenuForm
