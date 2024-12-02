import { MenuItemType } from '@/types/types'

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
