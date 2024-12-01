import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

import MenuContainer from '@/components/MenuContainer'
import { mockMenu as initialState } from '@/constants/mocks'
import * as helpers from '@/helpers/global'
import { MenuItemType } from '@/types/types'

jest.mock('../helpers/global', () => ({
  collectLabels: jest.fn(),
  doesMenuItemExist: jest.fn(),
  updateMenu: jest.fn(),
  editMenu: jest.fn(),
  deleteMenuItem: jest.fn(),
  getItemClass: jest.fn(),
  getSubClass: jest.fn(),
}))

describe('MenuContainer', () => {
  const mockCollectLabels = helpers.collectLabels as jest.Mock
  const mockDoesMenuItemExist = helpers.doesMenuItemExist as jest.Mock
  const mockUpdateMenu = helpers.updateMenu as jest.Mock
  const mockEditMenu = helpers.editMenu as jest.Mock
  const mockDeleteMenuItem = helpers.deleteMenuItem as jest.Mock
  const mockGetItemClass = helpers.getItemClass as jest.Mock
  const mockGetSubClass = helpers.getSubClass as jest.Mock
  const useStateMock = React.useState as jest.Mock

  const mockMenuItem = initialState[0]
  const mockMenuItemUpdated: MenuItemType = {
    label: 'Updated Home',
    link: 'https://test.com/home-updated',
    submenu: [],
  }

  beforeEach(() => {
    jest.clearAllMocks()
    mockCollectLabels.mockReturnValue(['Home'])
    mockDoesMenuItemExist.mockReturnValue(false)
    mockUpdateMenu.mockReturnValue([mockMenuItem])
    mockEditMenu.mockReturnValue([mockMenuItemUpdated])
    mockDeleteMenuItem.mockReturnValue([])
    mockGetItemClass.mockReturnValue('menu-item')
    mockGetSubClass.mockReturnValue('sub-item')
  })

  it('renders Menu component', () => {
    render(<MenuContainer />)

    expect(screen.getByText('Menu jest puste')).toBeInTheDocument()
  })

  it('adds a new menu item', () => {
    const newItem: MenuItemType = { label: 'New Item', link: '', submenu: [] }
    mockUpdateMenu.mockReturnValue([newItem])

    render(<MenuContainer />)

    const addMenuFormButton = screen.getByRole('button', { name: /Dodaj pozycję menu/i })
    fireEvent.click(addMenuFormButton)

    const labelInput = screen.getByLabelText(/Nazwa/i)
    expect(labelInput).toBeInTheDocument()
    fireEvent.change(labelInput, { target: { value: newItem.label } })

    const addButton = screen.getByRole('button', { name: /Dodaj/i })
    expect(addButton).toBeInTheDocument()
    fireEvent.click(addButton)

    expect(mockUpdateMenu).toHaveBeenCalledWith([], newItem, undefined)
    expect(mockCollectLabels).toHaveBeenCalledWith([newItem])
  })

  it('handles validation errors when adding a menu item', () => {
    mockCollectLabels.mockReturnValue([])
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {})

    render(<MenuContainer />)

    const invalidNewItem: MenuItemType = { label: 'a*', submenu: [] }

    const addMenuFormButton = screen.getByRole('button', { name: /Dodaj pozycję menu/i })
    fireEvent.click(addMenuFormButton)

    const labelInput = screen.getByLabelText(/Nazwa/i)
    fireEvent.change(labelInput, { target: { value: invalidNewItem.label } })

    const addButton = screen.getByRole('button', { name: /Dodaj/i })
    fireEvent.click(addButton)

    expect(alertSpy).toHaveBeenCalled()
    alertSpy.mockRestore()
  })

  it('renders delete button and deletes menu item on click', () => {
    jest.spyOn(React, 'useState').mockImplementationOnce(() => useStateMock(initialState))

    render(<MenuContainer />)

    initialState.forEach((item: MenuItemType) => {
      expect(screen.getByText(item.label)).toBeInTheDocument()
    })

    const deleteButtons = screen.getAllByRole('button', { name: /Usuń/i })

    fireEvent.click(deleteButtons[1])

    expect(screen.queryByText(initialState[0].label)).not.toBeInTheDocument()
  })

  it('edits a menu item', () => {
    jest.spyOn(React, 'useState').mockImplementationOnce(() => useStateMock(initialState))

    render(<MenuContainer />)

    const editButtons = screen.getAllByRole('button', { name: /Edytuj/i })
    fireEvent.click(editButtons[1])

    const labelInput = screen.getByLabelText(/Nazwa/i)
    fireEvent.change(labelInput, { target: { value: mockMenuItemUpdated.label } })

    const linkInput = screen.getByLabelText(/Link/i)
    fireEvent.change(linkInput, { target: { value: mockMenuItemUpdated.link } })

    fireEvent.click(screen.getByText('Dodaj'))

    expect(mockEditMenu).toHaveBeenCalledWith(initialState, mockMenuItem, mockMenuItemUpdated)

    expect(screen.queryByText(mockMenuItem.label)).not.toBeInTheDocument()
    expect(screen.getByText(mockMenuItemUpdated.label)).toBeInTheDocument()
  })
})
