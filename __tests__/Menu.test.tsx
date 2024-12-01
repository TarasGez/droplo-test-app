import { fireEvent, render, screen } from '@testing-library/react'

import Menu from '@/components/Menu'
import { mockMenu } from '@/constants/mocks'
import { MenuItemType } from '@/types/types'

describe('Menu', () => {
  const mockHandleAddNewItem = jest.fn()
  const mockHandleDeleteItem = jest.fn()
  const mockHandleEditItem = jest.fn()
  const mockHandleDragItem = jest.fn()

  const renderMenu = (items = mockMenu) =>
    render(
      <Menu
        items={items}
        handleAddNewItem={mockHandleAddNewItem}
        handleDeleteItem={mockHandleDeleteItem}
        handleEditItem={mockHandleEditItem}
        handleDragItem={mockHandleDragItem}
      />
    )

  it('renders the DraggableMenu when items are provided', () => {
    renderMenu()

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('https://test.com/home')).toBeInTheDocument()

    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('https://test.com/about')).toBeInTheDocument()

    expect(screen.getByText('Contacts')).toBeInTheDocument()
    expect(screen.getByText('https://test.com/contacts')).toBeInTheDocument()
  })

  it('renders the DraggableMenu with submenu when items are provided', () => {
    renderMenu()

    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('https://test.com/about')).toBeInTheDocument()

    expect(screen.getByText('Team')).toBeInTheDocument()
    expect(screen.getByText('https://test.com/about/team')).toBeInTheDocument()

    expect(screen.getByText('History')).toBeInTheDocument()
    expect(screen.getByText('https://test.com/about/history')).toBeInTheDocument()

    expect(screen.getByText('Early Days')).toBeInTheDocument()
    expect(screen.getByText('https://test.com/about/history/early-days')).toBeInTheDocument()
  })

  it('renders EmptyMenu when there are no items', () => {
    renderMenu([])

    expect(screen.getByText('Menu jest puste')).toBeInTheDocument()
    expect(screen.getByText('W tym menu nie ma jeszcze żadnych linków.')).toBeInTheDocument()
  })

  it('opens AddMenuForm when EmptyMenu button is clicked', () => {
    renderMenu([])

    const addButton = screen.getByRole('button', { name: /Dodaj pozycję menu/i })
    fireEvent.click(addButton)

    expect(screen.getByText('Dodaj')).toBeInTheDocument()
  })

  it('calls handleAddNewItem when a new menu item is added', () => {
    renderMenu([])

    const addButton = screen.getByRole('button', { name: /Dodaj pozycję menu/i })
    fireEvent.click(addButton)

    const addMenuFormButton = screen.getByRole('button', { name: /Dodaj/i })
    expect(addMenuFormButton).toBeInTheDocument()

    const mockNewItem: MenuItemType = { label: 'New Item', link: 'http://test.com/new-item', submenu: [] }

    const labelInput = screen.getByLabelText(/Nazwa/i)
    fireEvent.change(labelInput, { target: { value: 'New Item' } })

    const idInput = screen.getByLabelText(/Link/i)
    fireEvent.change(idInput, { target: { value: 'http://test.com/new-item' } })

    fireEvent.click(addMenuFormButton)

    expect(mockHandleAddNewItem).toHaveBeenCalledWith(mockNewItem, undefined)
  })

  it('calls handleDeleteItem when an item is deleted', () => {
    renderMenu()

    const deleteButtons = screen.getAllByRole('button', { name: /Usuń/i })
    fireEvent.click(deleteButtons[1])

    expect(mockHandleDeleteItem).toHaveBeenCalledWith('Home')
  })
})
