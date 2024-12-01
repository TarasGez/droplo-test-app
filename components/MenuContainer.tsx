'use client'
import { useState } from 'react'
import { z } from 'zod'

import { collectLabels, deleteMenuItem, doesMenuItemExist, editMenu, updateMenu } from '@/helpers/global'
import { menuItemSchema } from '@/types/schemas'
import { MenuItemType } from '@/types/types'

import Menu from './Menu'

const MenuContainer = () => {
  const [menu, setMenu] = useState<MenuItemType[]>([])
  const [labels, setLabels] = useState<string[]>([])

  const addMenuItem = (newItem: MenuItemType, parentLabel?: string) => {
    try {
      menuItemSchema(labels).parse(newItem)

      if (doesMenuItemExist(menu, parentLabel, newItem.label)) {
        alert(`Error: The menu item "${newItem.label}" already exists under "${parentLabel}".`)
        return
      }
      const updatedMenu = updateMenu(menu, newItem, parentLabel)
      setMenu(updatedMenu)
      setLabels(collectLabels(updatedMenu))
    } catch (error) {
      if (error instanceof z.ZodError) {
        alert(`Validation Error: ${error.errors.map((err) => err.message).join(', ')}`)
      } else {
        console.error(error)
      }
    }
  }

  const handleEditItem = (oldItem: MenuItemType, updatedItem: MenuItemType) => {
    try {
      menuItemSchema(labels).parse(updatedItem)

      setMenu(editMenu(menu, oldItem, updatedItem))
    } catch (error) {
      if (error instanceof z.ZodError) {
        alert(`Validation Error: ${error.errors.map((err) => err.message).join(', ')}`)
      } else {
        console.error(error)
      }
    }
  }

  const handleAddNewItem = (newItem: MenuItemType, parentLabel: string | undefined) => {
    if (newItem) {
      if (parentLabel) {
        addMenuItem(newItem, parentLabel)
      } else {
        addMenuItem(newItem)
      }
    }
  }

  const handleDeleteItem = (labelToDelete: string) => {
    setMenu(deleteMenuItem(menu, labelToDelete))
  }

  return (
    <Menu
      items={menu}
      handleAddNewItem={handleAddNewItem}
      handleEditItem={handleEditItem}
      handleDeleteItem={handleDeleteItem}
      handleDragItem={setMenu}
    />
  )
}

export default MenuContainer
