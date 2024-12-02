import { Active, Over } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'

import { MenuItemType } from '@/types/types'

export const dragMenuItem = (menu: MenuItemType[], active: Active, over: Over | null): MenuItemType[] | undefined => {
  if (!over || active.id === over.id) return

  const activeIndex = menu.findIndex((item) => item.label === active.id)
  const overIndex = menu.findIndex((item) => item.label === over.id)

  if (activeIndex !== -1 && overIndex !== -1) {
    const newOrder = arrayMove(menu, activeIndex, overIndex)
    return newOrder
  }
}

export const dragSubMenuItem = (
  itemsList: MenuItemType[],
  parent: string,
  newSubMenu: MenuItemType[]
): MenuItemType[] => {
  return itemsList.map((item) => {
    if (item.label === parent) {
      return {
        ...item,
        submenu: newSubMenu,
      }
    }

    if (item.submenu?.length) {
      return {
        ...item,
        submenu: dragSubMenuItem(item.submenu, parent, newSubMenu),
      }
    }
    return item
  })
}
