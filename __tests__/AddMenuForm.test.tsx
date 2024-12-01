import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import AddMenuForm from '@/components/AddMenuForm'
import { FormTypes } from '@/types/types'

describe('AddMenuForm', () => {
  const mockOnAdd = jest.fn()
  const mockOnEdit = jest.fn()
  const mockOnClose = jest.fn()
  const mockItem = { label: 'Home', link: '', submenu: [] }

  it('calls onAdd when form is submitted in ADD mode', async () => {
    render(<AddMenuForm type={FormTypes.ADD} onAdd={mockOnAdd} onEdit={mockOnEdit} onClose={mockOnClose} />)

    const labelInput = screen.getByLabelText('Nazwa')
    const linkInput = screen.getByLabelText('Link (opcjonalnie)')
    const submitButton = screen.getByRole('button', { name: /Dodaj/i })

    await userEvent.type(labelInput, 'New Item')
    await userEvent.type(linkInput, 'http://example.com')
    fireEvent.click(submitButton)

    expect(mockOnAdd).toHaveBeenCalled()
    expect(mockOnAdd).toHaveBeenCalledWith(
      expect.objectContaining({
        label: 'New Item',
        link: 'http://example.com',
        submenu: [],
      }),
      undefined
    )
  })

  it('calls onEdit when form is submitted in EDIT mode', async () => {
    render(
      <AddMenuForm type={FormTypes.EDIT} item={mockItem} onAdd={mockOnAdd} onEdit={mockOnEdit} onClose={mockOnClose} />
    )

    const labelInput = screen.getByLabelText('Nazwa')
    const linkInput = screen.getByLabelText('Link (opcjonalnie)')
    const submitButton = screen.getByRole('button', { name: /dodaj/i })

    await userEvent.clear(labelInput)
    await userEvent.type(labelInput, 'Updated Item')
    await userEvent.clear(linkInput)
    await userEvent.type(linkInput, 'http://updated-example.com')
    fireEvent.click(submitButton)

    expect(mockOnEdit).toHaveBeenCalled()
    expect(mockOnEdit).toHaveBeenCalledWith(
      expect.objectContaining({
        label: 'Home',
        link: '',
        submenu: [],
      }),
      expect.objectContaining({
        label: 'Updated Item',
        link: 'http://updated-example.com',
        submenu: [],
      })
    )
  })

  it('calls onClose when the cancel button is clicked', async () => {
    render(<AddMenuForm type={FormTypes.ADD} onAdd={mockOnAdd} onEdit={mockOnEdit} onClose={mockOnClose} />)

    const cancelButton = screen.getByRole('button', { name: /Anuluj/i })

    fireEvent.click(cancelButton)

    expect(mockOnClose).toHaveBeenCalled()
  })
})
