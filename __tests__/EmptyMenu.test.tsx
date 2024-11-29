import { fireEvent, render, screen } from '@testing-library/react'

import EmptyMenu from '@/components/EmptyMenu'

describe('EmptyMenu', () => {
  it('renders the component correctly', () => {
    render(<EmptyMenu setIsFormOpen={jest.fn()} />)

    expect(screen.getByText('Menu jest puste')).toBeInTheDocument()
    expect(screen.getByText('W tym menu nie ma jeszcze żadnych linków.')).toBeInTheDocument()

    const button = screen.getByRole('button', { name: /Dodaj pozycję menu/i })
    expect(button).toBeInTheDocument()
  })

  it('calls setIsFormOpen when the button is clicked', () => {
    const mockSetIsFormOpen = jest.fn()
    render(<EmptyMenu setIsFormOpen={mockSetIsFormOpen} />)

    const button = screen.getByRole('button', { name: /Dodaj pozycję menu/i })
    fireEvent.click(button)

    expect(mockSetIsFormOpen).toHaveBeenCalledTimes(1)
    expect(mockSetIsFormOpen).toHaveBeenCalledWith(true)
  })
})
