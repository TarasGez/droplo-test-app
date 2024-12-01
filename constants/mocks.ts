import { DragEndEvent } from '@dnd-kit/core'

import { collectLabels } from '@/helpers/global'
import { MenuItemType } from '@/types/types'

export const mockMenu = [
  {
    label: 'Home',
    link: 'https://test.com/home',
    submenu: [],
  },
  {
    label: 'About',
    link: 'https://test.com/about',
    submenu: [
      {
        label: 'Team',
        link: 'https://test.com/about/team',
        submenu: [],
      },
      {
        label: 'History',
        link: 'https://test.com/about/history',
        submenu: [
          {
            label: 'Early Days',
            link: 'https://test.com/about/history/early-days',
            submenu: [],
          },
        ],
      },
    ],
  },
  {
    label: 'Contacts',
    link: 'https://test.com/contacts',
    submenu: [],
  },
]

export const mockLabels = collectLabels(mockMenu)

// DndKit Mock Events
export const mockMenuDND: MenuItemType[] = [
  { label: 'Item 1', link: '', submenu: [] },
  { label: 'Item 2', link: '', submenu: [] },
  { label: 'Item 3', link: '', submenu: [] },
]

export const mockEvent: DragEndEvent = {
  active: {
    id: mockMenuDND[0].label,
    data: {
      current: {
        type: 'menuItem',
        label: mockMenuDND[0].label,
        index: 0,
      },
    },
    rect: { current: { initial: null, translated: null } },
  },
  over: {
    id: mockMenuDND[1].label,
    rect: {
      width: 100,
      height: 40,
      top: 240,
      left: 300,
      bottom: 280,
      right: 400,
    },
    data: {
      current: {
        type: 'menuItem',
        label: mockMenuDND[1].label,
        index: 1,
      },
    },
    disabled: false,
  },
  activatorEvent: new MouseEvent('mousemove'),
  collisions: null,
  delta: {
    x: 0,
    y: 0,
  },
}
