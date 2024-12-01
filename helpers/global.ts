import { Active, Over } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'

import { MenuItemType, MenuType, MenuTypes } from '@/types/types'

export const collectLabels = (menuItems: MenuItemType[]): string[] => {
  return menuItems.reduce<string[]>((labels, item) => {
    labels.push(item.label)
    if (item.submenu?.length) {
      labels.push(...collectLabels(item.submenu))
    }
    return labels
  }, [])
}

export const doesMenuItemExist = (menuItems: MenuItemType[], parentLabel: string | undefined, newItemLabel: string) => {
  for (const item of menuItems) {
    if (!parentLabel && item.label === newItemLabel) {
      return true
    }
    if (item.label === parentLabel) {
      if (item.submenu.some((subItem) => subItem.label === newItemLabel)) {
        return true
      }
    }
    if (item.submenu?.length > 0) {
      if (doesMenuItemExist(item.submenu, parentLabel, newItemLabel)) {
        return true
      }
    }
  }
  return false
}

export const updateMenu = (menuItems: MenuItemType[], newItem: MenuItemType, parentLabel?: string): MenuItemType[] => {
  if (!parentLabel) {
    return [...menuItems, newItem]
  }
  return menuItems.map((item: MenuItemType) => {
    if (item.label === parentLabel) {
      return {
        ...item,
        submenu: [...item.submenu, newItem],
      }
    }
    if (item.submenu?.length) {
      return {
        ...item,
        submenu: updateMenu(item.submenu, newItem, parentLabel),
      }
    }
    return item
  })
}

export const editMenu = (
  menuItems: MenuItemType[],
  oldItem: MenuItemType,
  updatedItem: MenuItemType
): MenuItemType[] => {
  return menuItems.map((item) => {
    if (item.label === oldItem.label && item.link === oldItem.link) {
      return {
        ...item,
        ...updatedItem,
      }
    }

    if (item.submenu?.length) {
      return {
        ...item,
        submenu: editMenu(item.submenu, oldItem, updatedItem),
      }
    }

    return item
  })
}

export const deleteMenuItem = (menuItems: MenuItemType[], targetLabel: string): MenuItemType[] =>
  menuItems
    .map((item: MenuItemType) => {
      if (item.label === targetLabel) return null
      if (item.submenu?.length) {
        return {
          ...item,
          submenu: deleteMenuItem(item.submenu, targetLabel),
        }
      }
      return item
    })
    .filter((item): item is MenuItemType => item !== null)

export const dragMenuItem = (menu: MenuItemType[], active: Active, over: Over | null): MenuItemType[] | undefined => {
  if (!over || active.id === over.id) return

  const activeIndex = menu.findIndex((item) => item.label === active.id)
  const overIndex = menu.findIndex((item) => item.label === over.id)

  if (activeIndex !== -1 && overIndex !== -1) {
    const newOrder = arrayMove(menu, activeIndex, overIndex)
    return newOrder
  }
}

export const updateSubMenu = (
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
        submenu: updateSubMenu(item.submenu, parent, newSubMenu),
      }
    }
    return item
  })
}

export const getItemClass = (index: number, length: number, subLength: number): string => {
  if (index === 0) {
    if (length === 1) {
      return 'menu-item-single'
    }
    if (subLength > 0) {
      return 'menu-item-first-with-sub'
    }
    return 'menu-item-first'
  }
  if (subLength > 0) {
    return 'menu-item-with-sub'
  }
  if (index === length - 1) {
    return 'menu-item-last'
  }
  return 'menu-item'
}

export const getSubClass = (index: number, length: number, subLength: number): string => {
  if (subLength > 0) {
    return 'sub-item-with-sub'
  }
  if (index === length - 1) {
    return 'sub-item-last'
  }

  return 'sub-item'
}

export const getClass = (type: MenuType, index: number, length: number, subLength: number): string => {
  if (type === MenuTypes.MENU) {
    return getItemClass(index, length, subLength)
  }
  return getSubClass(index, length, subLength)
}
