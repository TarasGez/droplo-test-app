import { collectLabels, deleteMenuItem, doesMenuItemExist, editMenu, updateMenu } from '@/helpers/global'
import { MenuItemType } from '@/types/types'

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
