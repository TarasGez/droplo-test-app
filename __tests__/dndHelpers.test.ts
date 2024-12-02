import { Active, Over } from '@dnd-kit/core'

import { mockEvent, mockMenuDND } from '@/constants/mocks'
import { dragMenuItem, dragSubMenuItem } from '@/helpers/dndHelpers'
import { MenuItemType } from '@/types/types'

describe('dragMenuItem', () => {
  it('should return a new array with items reordered when active and over items are different', () => {
    const active = mockEvent.active
    const over = mockEvent.over

    const result = dragMenuItem(mockMenuDND, active, over)

    expect(result).toEqual([
      { label: 'Item 2', link: '', submenu: [] },
      { label: 'Item 1', link: '', submenu: [] },
      { label: 'Item 3', link: '', submenu: [] },
    ])
  })

  it('should return undefined if over is null', () => {
    const active = mockEvent.active
    const over: Over | null = null

    const result = dragMenuItem(mockMenuDND, active, over)

    expect(result).toBeUndefined()
  })

  it('should return undefined if active and over items are the same', () => {
    const active = mockEvent.active
    const over = mockEvent.over as Over
    over.id = mockEvent.active.id

    const result = dragMenuItem(mockMenuDND, active, over)

    expect(result).toBeUndefined()
  })

  it('should return the original menu if active or over items are not found', () => {
    const active = { id: 'Item not in the menu' } as Active
    const over = mockEvent.over

    const result = dragMenuItem(mockMenuDND, active, over)

    expect(result).toBeUndefined()
  })
})

describe('dragSubMenuItem', () => {
  it('should update the submenu of the specified parent item', () => {
    const itemsList: MenuItemType[] = [
      { label: 'Item 1', link: '/item1', submenu: [] },
      {
        label: 'Item 2',
        link: '/item2',
        submenu: [
          { label: 'Subitem 1', link: '/subitem1', submenu: [] },
          { label: 'Subitem 2', link: '/subitem2', submenu: [] },
        ],
      },
      { label: 'Item 3', link: '/item3', submenu: [] },
    ]
    const parent = 'Item 2'
    const newSubMenu: MenuItemType[] = [
      { label: 'Updated Subitem 1', link: '/updated-subitem1', submenu: [] },
      { label: 'Updated Subitem 2', link: '/updated-subitem2', submenu: [] },
    ]

    const result = dragSubMenuItem(itemsList, parent, newSubMenu)

    expect(result).toEqual([
      { label: 'Item 1', link: '/item1', submenu: [] },
      {
        label: 'Item 2',
        link: '/item2',
        submenu: [
          { label: 'Updated Subitem 1', link: '/updated-subitem1', submenu: [] },
          { label: 'Updated Subitem 2', link: '/updated-subitem2', submenu: [] },
        ],
      },
      { label: 'Item 3', link: '/item3', submenu: [] },
    ])
  })

  it('should update the submenu of a nested parent item', () => {
    const itemsList: MenuItemType[] = [
      {
        label: 'Item 1',
        link: '/item1',
        submenu: [
          {
            label: 'Subitem 1',
            link: '/subitem1',
            submenu: [
              { label: 'Subsubitem 1', link: '/subitem1/subsubitem1', submenu: [] },
              { label: 'Subsubitem 2', link: '/subitem1/subsubitem2', submenu: [] },
            ],
          },
          { label: 'Subitem 2', link: '/subitem2', submenu: [] },
        ],
      },
      { label: 'Item 2', link: '/item2', submenu: [] },
    ]
    const parent = 'Subitem 1'
    const newSubMenu: MenuItemType[] = [
      { label: 'Updated Subsubitem 1', link: '/subitem1/updated-subsubitem1', submenu: [] },
      { label: 'Subsubitem 2', link: '/subitem1/subsubitem2', submenu: [] },
    ]

    const result = dragSubMenuItem(itemsList, parent, newSubMenu)

    expect(result).toEqual([
      {
        label: 'Item 1',
        link: '/item1',
        submenu: [
          {
            label: 'Subitem 1',
            link: '/subitem1',
            submenu: [
              { label: 'Updated Subsubitem 1', link: '/subitem1/updated-subsubitem1', submenu: [] },
              { label: 'Subsubitem 2', link: '/subitem1/subsubitem2', submenu: [] },
            ],
          },
          { label: 'Subitem 2', link: '/subitem2', submenu: [] },
        ],
      },
      { label: 'Item 2', link: '/item2', submenu: [] },
    ])
  })

  it('should return the items list unchanged if the parent is not found', () => {
    const itemsList: MenuItemType[] = [
      { label: 'Item 1', link: '/item1', submenu: [] },
      { label: 'Item 2', link: '/item2', submenu: [] },
    ]
    const parent = 'Item 3'
    const newSubMenu: MenuItemType[] = [{ label: 'Updated Subitem 1', link: '/updated-subitem1', submenu: [] }]

    const result = dragSubMenuItem(itemsList, parent, newSubMenu)

    expect(result).toEqual(itemsList)
  })

  it('should handle an empty items list correctly', () => {
    const itemsList: MenuItemType[] = []
    const parent = 'Item 1'
    const newSubMenu: MenuItemType[] = [{ label: 'Updated Subitem 1', link: '/updated-subitem1', submenu: [] }]

    const result = dragSubMenuItem(itemsList, parent, newSubMenu)

    expect(result).toEqual([])
  })
})
