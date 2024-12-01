import { render, screen, within } from '@testing-library/react'

import SortablContainer from '@/components/DragAndDrop/SortableMenuItem'
import { mockEvent, mockMenuDND } from '@/constants/mocks'
import { MenuTypes } from '@/types/types'

const mockProps = {
  items: mockMenuDND,
  type: MenuTypes.MENU,
  handleAddItem: jest.fn(),
  handleEditItem: jest.fn(),
  handleDeleteItem: jest.fn(),
  handleDragEnd: jest.fn(),
  handleDragSubMenu: jest.fn(),
  setActiveParent: jest.fn(),
}

describe('SortablContainer', () => {
  it('renders all menu items', () => {
    render(<SortablContainer {...mockProps} />)

    const sortableList = screen.getByTestId('sortable-list')
    const items = within(sortableList).getAllByTestId('sortable-item')
    expect(items).toHaveLength(mockMenuDND.length)

    mockMenuDND.forEach((item) => {
      expect(screen.getByText(item.label)).toBeInTheDocument()
    })
  })

  it('calls handleDragEnd when drag ends', () => {
    render(<SortablContainer {...mockProps} />)

    mockProps.handleDragEnd(mockEvent)

    expect(mockProps.handleDragEnd).toHaveBeenCalledWith(mockEvent)
  })

  it('calls handleAddItem when adding a new item', () => {
    render(<SortablContainer {...mockProps} />)

    const newItem = { label: 'New Item', submenu: [] }
    mockProps.handleAddItem(newItem, undefined)

    expect(mockProps.handleAddItem).toHaveBeenCalledWith(newItem, undefined)
  })

  it('calls handleDeleteItem when deleting an item', () => {
    render(<SortablContainer {...mockProps} />)

    const labelToDelete = 'Item 2'
    mockProps.handleDeleteItem(labelToDelete)

    expect(mockProps.handleDeleteItem).toHaveBeenCalledWith(labelToDelete)
  })

  it('applies correct class names to menu items', () => {
    render(<SortablContainer {...mockProps} />)

    const sortableList = screen.getByTestId('sortable-list')
    const items = within(sortableList).getAllByTestId('sortable-item')
    expect(items).toHaveLength(mockMenuDND.length)

    items.forEach((item, index) => {
      if (index === 0) {
        expect(item).toHaveClass('menu-item-first')
      } else if (index === items.length - 1) {
        expect(item).toHaveClass('menu-item-last')
      } else {
        expect(item).toHaveClass('menu-item')
      }
    })
  })
})
