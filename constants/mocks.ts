import { collectLabels } from '@/helpers/global'

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
