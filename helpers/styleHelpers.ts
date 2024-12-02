import { MenuType, MenuTypes } from '@/types/types'

export const getItemClass = (index: number, length: number, subLength: number): string => {
  if (index === 0) {
    if (subLength > 0) {
      return 'menu-item-first-with-sub'
    }
    if (length === 1) {
      return 'menu-item-single'
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
