import { DndContext } from '@dnd-kit/core'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import SortableMenuItem from '@/components/DragAndDrop/SortableMenuItem/SortableMenuItem'
import { MenuItemType } from '@/types/types'

const mockOnAdd = jest.fn()
const mockOnEdit = jest.fn()
const mockOnDelete = jest.fn()
const mockOnDrag = jest.fn()
const mockSetActiveParent = jest.fn()

const mockItem: MenuItemType = {
  label: 'Home',
  link: 'https://example.com',
  submenu: [
    {
      label: 'Submenu 1',
      link: 'https://example.com/sub1',
      submenu: [],
    },
    {
      label: 'Submenu 2',
      link: 'https://example.com/sub2',
      submenu: [],
    },
  ],
}

const newItem = { label: 'New Item', link: 'https://example.com/new', submenu: [] }

const renderSortable = () =>
  render(
    <SortableMenuItem
      item={mockItem}
      onAdd={mockOnAdd}
      onEdit={mockOnEdit}
      onDelete={mockOnDelete}
      onDrag={mockOnDrag}
      setActiveParent={mockSetActiveParent}
      className="menu-item"
    />
  )

describe('SortableMenuItem', () => {
  it('renders menu item with label and link', () => {
    renderSortable()

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('https://example.com')).toBeInTheDocument()
  })

  it('calls onDelete when "Usuń" button is clicked', () => {
    renderSortable()

    const deleteButtons = screen.getAllByText('Usuń')
    fireEvent.click(deleteButtons[0])

    expect(mockOnDelete).toHaveBeenCalledWith(mockItem.label)
  })

  it('opens add form when "Dodaj pozycję menu" button is clicked', () => {
    renderSortable()

    const addButtons = screen.getAllByText('Dodaj pozycję menu')
    fireEvent.click(addButtons[0])

    expect(screen.getByText(/Nazwa/i)).toBeInTheDocument()
    expect(screen.getByText(/Link/i)).toBeInTheDocument()
    expect(screen.getByText(/Anuluj/i)).toBeInTheDocument()
    expect(screen.getAllByText(/Dodaj/i)[0]).toBeInTheDocument()
  })

  it('calls onAdd when a new item is added', () => {
    renderSortable()

    const addButtons = screen.getAllByText('Dodaj pozycję menu')
    fireEvent.click(addButtons[0])

    const labelInput = screen.getByLabelText(/Nazwa/i)
    fireEvent.change(labelInput, { target: { value: newItem.label } })

    const linkInput = screen.getByLabelText(/Link/i)
    fireEvent.change(linkInput, { target: { value: newItem.link } })

    fireEvent.click(screen.getByText('Dodaj'))

    expect(mockOnAdd).toHaveBeenCalledWith(newItem, mockItem.label)
  })

  it('calls onDrag when an item is dragged', async () => {
    render(
      <DndContext
        onDragEnd={() => {
          mockOnDrag(mockItem.label, [
            { label: 'Submenu 1', link: 'https://test.com/home/sub1', submenu: [] },
            { label: 'Submenu 2', link: 'https://test.com/home/sub2', submenu: [] },
          ])
        }}
      >
        <SortableMenuItem
          item={mockItem}
          onAdd={mockOnAdd}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          onDrag={mockOnDrag}
          setActiveParent={mockSetActiveParent}
          className="menu-item"
        />
      </DndContext>
    )

    const draggableElement = screen.getByText('Home')
    const dropTarget = screen.getByText('Submenu 1')

    const user = userEvent.setup()
    await user.pointer({ keys: '[MouseLeft>]', target: draggableElement })
    await user.pointer({ target: dropTarget })
    await user.pointer({ keys: '[/MouseLeft]' })

    expect(mockOnDrag).toHaveBeenCalledWith(mockItem.label, expect.any(Array))
    expect(mockOnDrag).toHaveBeenCalledTimes(1)
  })
})
