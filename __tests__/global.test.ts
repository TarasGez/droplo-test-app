import { Active, Over } from '@dnd-kit/core'

import { mockEvent, mockMenuDND } from '@/constants/mocks'
import {
  collectLabels,
  deleteMenuItem,
  doesMenuItemExist,
  dragMenuItem,
  editMenu,
  getClass,
  getItemClass,
  getSubClass,
  updateMenu,
  updateSubMenu,
} from '@/helpers/global'
import { MenuItemType, MenuTypes } from '@/types/types'

describe('collectLabels', () => {
  it('should collect all labels from menu items', () => {
    const menuItems: MenuItemType[] = [
      { label: 'Home', submenu: [] },
      { label: 'About', submenu: [] },
      { label: 'Contact', submenu: [] },
    ]

    expect(collectLabels(menuItems)).toEqual(['Home', 'About', 'Contact'])
  })

  it('should recursively collect all labels from nested submenus', () => {
    const menuItems: MenuItemType[] = [
      { label: 'Home', submenu: [] },
      {
        label: 'About',
        submenu: [
          { label: 'Team', submenu: [] },
          { label: 'History', submenu: [] },
        ],
      },
      { label: 'Contact', submenu: [] },
    ]

    expect(collectLabels(menuItems)).toEqual(['Home', 'About', 'Team', 'History', 'Contact'])
  })
})

describe('doesMenuItemExist', () => {
  const menuItems: MenuItemType[] = [
    { label: 'Home', submenu: [] },
    {
      label: 'About',
      submenu: [
        { label: 'Team', submenu: [] },
        { label: 'History', submenu: [] },
      ],
    },
    { label: 'Contact', submenu: [] },
  ]

  it('should return true if the item exists in the root menu', () => {
    expect(doesMenuItemExist(menuItems, undefined, 'About')).toBe(true)
  })

  it('should return true if the item exists in a submenu', () => {
    expect(doesMenuItemExist(menuItems, 'About', 'Team')).toBe(true)
  })

  it('should return false if the item does not exist', () => {
    expect(doesMenuItemExist(menuItems, undefined, 'Services')).toBe(false)
  })
})

describe('updateMenu', () => {
  it('should add a new item to the root menu if no parent label is provided', () => {
    const menuItems: MenuItemType[] = [
      { label: 'Home', submenu: [] },
      { label: 'About', submenu: [] },
    ]

    const newItem: MenuItemType = { label: 'Contact', submenu: [] }
    const updatedMenu = updateMenu(menuItems, newItem)

    expect(updatedMenu).toEqual([
      { label: 'Home', submenu: [] },
      { label: 'About', submenu: [] },
      { label: 'Contact', submenu: [] },
    ])
  })

  it('should add a new item to a specific submenu', () => {
    const menuItems: MenuItemType[] = [
      { label: 'Home', submenu: [] },
      {
        label: 'About',
        submenu: [
          { label: 'Team', submenu: [] },
          { label: 'History', submenu: [] },
        ],
      },
    ]

    const newItem: MenuItemType = { label: 'Contact', submenu: [] }
    const updatedMenu = updateMenu(menuItems, newItem, 'About')

    expect(updatedMenu).toEqual([
      { label: 'Home', submenu: [] },
      {
        label: 'About',
        submenu: [
          { label: 'Team', submenu: [] },
          { label: 'History', submenu: [] },
          { label: 'Contact', submenu: [] },
        ],
      },
    ])
  })
})

describe('editMenu', () => {
  it('should update the specified menu item', () => {
    const menuItems: MenuItemType[] = [
      { label: 'Item 1', link: '/item1', submenu: [] },
      { label: 'Item 2', link: '/item2', submenu: [] },
    ]
    const oldItem: MenuItemType = { label: 'Item 1', link: '/item1', submenu: [] }
    const updatedItem: MenuItemType = { label: 'Updated Item 1', link: '/updated-item1', submenu: [] }

    const result = editMenu(menuItems, oldItem, updatedItem)

    expect(result).toEqual([
      { label: 'Updated Item 1', link: '/updated-item1', submenu: [] },
      { label: 'Item 2', link: '/item2', submenu: [] },
    ])
  })

  it('should update the specified item within a submenu', () => {
    const menuItems: MenuItemType[] = [
      {
        label: 'Item 1',
        link: '/item1',
        submenu: [
          { label: 'Subitem 1', link: '/subitem1', submenu: [] },
          { label: 'Subitem 2', link: '/subitem2', submenu: [] },
        ],
      },
      { label: 'Item 2', link: '/item2', submenu: [] },
    ]
    const oldItem: MenuItemType = { label: 'Subitem 1', link: '/subitem1', submenu: [] }
    const updatedItem: MenuItemType = { label: 'Updated Subitem 1', link: '/updated-subitem1', submenu: [] }

    const result = editMenu(menuItems, oldItem, updatedItem)

    expect(result).toEqual([
      {
        label: 'Item 1',
        link: '/item1',
        submenu: [
          { label: 'Updated Subitem 1', link: '/updated-subitem1', submenu: [] },
          { label: 'Subitem 2', link: '/subitem2', submenu: [] },
        ],
      },
      { label: 'Item 2', link: '/item2', submenu: [] },
    ])
  })

  it('should return the menu unchanged if the item to update is not found', () => {
    const menuItems: MenuItemType[] = [
      { label: 'Item 1', link: '/item1', submenu: [] },
      { label: 'Item 2', link: '/item2', submenu: [] },
    ]
    const oldItem: MenuItemType = { label: 'Item 3', link: '/item3', submenu: [] }
    const updatedItem: MenuItemType = { label: 'Updated Item 3', link: '/updated-item3', submenu: [] }

    const result = editMenu(menuItems, oldItem, updatedItem)

    expect(result).toEqual(menuItems)
  })

  it('should handle an empty menu correctly', () => {
    const menuItems: MenuItemType[] = []
    const oldItem: MenuItemType = { label: 'Item 1', link: '/item1', submenu: [] }
    const updatedItem: MenuItemType = { label: 'Updated Item 1', link: '/updated-item1', submenu: [] }

    const result = editMenu(menuItems, oldItem, updatedItem)

    expect(result).toEqual([])
  })
})

describe('deleteMenuItem', () => {
  it('should remove an item from the root menu', () => {
    const menuItems: MenuItemType[] = [
      { label: 'Home', submenu: [] },
      { label: 'About', submenu: [] },
      { label: 'Contact', submenu: [] },
    ]

    const updatedMenu = deleteMenuItem(menuItems, 'About')

    expect(updatedMenu).toEqual([
      { label: 'Home', submenu: [] },
      { label: 'Contact', submenu: [] },
    ])
  })

  it('should remove an item from a submenu', () => {
    const menuItems: MenuItemType[] = [
      {
        label: 'About',
        submenu: [
          { label: 'Team', submenu: [] },
          { label: 'History', submenu: [] },
        ],
      },
      { label: 'Contact', submenu: [] },
    ]

    const updatedMenu = deleteMenuItem(menuItems, 'Team')

    expect(updatedMenu).toEqual([
      {
        label: 'About',
        submenu: [{ label: 'History', submenu: [] }],
      },
      { label: 'Contact', submenu: [] },
    ])
  })
})

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

describe('updateSubMenu', () => {
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

    const result = updateSubMenu(itemsList, parent, newSubMenu)

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

    const result = updateSubMenu(itemsList, parent, newSubMenu)

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

    const result = updateSubMenu(itemsList, parent, newSubMenu)

    expect(result).toEqual(itemsList)
  })

  it('should handle an empty items list correctly', () => {
    const itemsList: MenuItemType[] = []
    const parent = 'Item 1'
    const newSubMenu: MenuItemType[] = [{ label: 'Updated Subitem 1', link: '/updated-subitem1', submenu: [] }]

    const result = updateSubMenu(itemsList, parent, newSubMenu)

    expect(result).toEqual([])
  })
})

describe('getItemClass', () => {
  it('should return "menu-item-single" if index is 0 and length is 1', () => {
    const result = getItemClass(0, 1, 0)
    expect(result).toBe('menu-item-single')
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
