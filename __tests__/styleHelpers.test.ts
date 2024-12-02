import { getClass, getItemClass, getSubClass } from '@/helpers/styleHelpers'
import { MenuTypes } from '@/types/types'

describe('getItemClass', () => {
  it('should return "menu-item-single" if index is 0 and length is 1', () => {
    const result = getItemClass(0, 1, 0)
    expect(result).toBe('menu-item-single')
  })

  it('should return "menu-item-first-with-sub" if index is 0, length is 1, and subLength is greater than 0', () => {
    const result = getItemClass(0, 1, 2)
    expect(result).toBe('menu-item-first-with-sub')
  })

  it('should return "menu-item-first-with-sub" if index is 0, length is greater than 1, and subLength is greater than 0', () => {
    const result = getItemClass(0, 3, 2)
    expect(result).toBe('menu-item-first-with-sub')
  })

  it('should return "menu-item-first" if index is 0, length is greater than 1, and subLength is 0', () => {
    const result = getItemClass(0, 3, 0)
    expect(result).toBe('menu-item-first')
  })

  it('should return "menu-item-with-sub" if index is not 0, subLength is greater than 0', () => {
    const result = getItemClass(1, 3, 2)
    expect(result).toBe('menu-item-with-sub')
  })

  it('should return "menu-item-last" if index is the last in the list and subLength is 0', () => {
    const result = getItemClass(2, 3, 0)
    expect(result).toBe('menu-item-last')
  })

  it('should return "menu-item" if index is not 0 or the last and subLength is 0', () => {
    const result = getItemClass(1, 3, 0)
    expect(result).toBe('menu-item')
  })
})

describe('getSubClass', () => {
  it('should return "sub-item-with-sub" if subLength is greater than 0', () => {
    const result = getSubClass(1, 3, 2)
    expect(result).toBe('sub-item-with-sub')
  })

  it('should return "sub-item-last" if index is the last in the list and subLength is 0', () => {
    const result = getSubClass(2, 3, 0)
    expect(result).toBe('sub-item-last')
  })

  it('should return "sub-item" if subLength is 0 and index is not the last', () => {
    const result = getSubClass(1, 3, 0)
    expect(result).toBe('sub-item')
  })
})

describe('getClass', () => {
  it('should return the correct class for MenuType.MENU', () => {
    const result = getClass(MenuTypes.MENU, 0, 3, 2)
    expect(result).toBe('menu-item-first-with-sub')
  })

  it('should return the correct class for MenuType.SUBMENU', () => {
    const result = getClass(MenuTypes.SUBMENU, 1, 3, 0)
    expect(result).toBe('sub-item')
  })
})
