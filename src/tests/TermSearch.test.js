import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { fetchIdTerm } from '../helpers/requestAPI'
import { mockResFetchIdTermLinux } from './mock/responseAPI'

import TermSearch from '../components/TermSearch'

const FIRST_TERM_VALID = 'Linux'
const FIRST_TERM_INVALID = 'Li'
const SECOND_TERM_INVALID = 'Pneumoultramicroscopicossilicovulcanoconiótico'

jest.mock('../helpers/requestAPI', () => ({
  fetchIdTerm: jest.fn(),
  fetchLinksTerm: jest.fn(),
}));

describe('Component TermSearch', () => {
  it('Logo Axur', () => {
    render(<TermSearch />)
    const imgLogo = screen.getByRole('img', {  name: /logo axur/i})
    expect(imgLogo).toBeInTheDocument()
    expect(imgLogo).toHaveAttribute('alt', 'Logo Axur')
    expect(imgLogo).toHaveAttribute('src', 'Logo-Axur.svg')
  })
  it('Search success', async () => {
    render(<TermSearch />)
    const inputSearch = screen.getByTestId('inputSearch')
    expect(inputSearch).toBeInTheDocument()
    expect(inputSearch).toHaveAttribute('placeholder', 'Search')
    const btnSearch = screen.getByRole('button', { name: /icon search/i })
    expect(btnSearch).toBeInTheDocument()
    expect(btnSearch).toBeDisabled()
    
    expect(screen.getByTestId('inputSearch').value).toBe('')
    userEvent.type(inputSearch, FIRST_TERM_VALID)
    expect(btnSearch).not.toBeDisabled()
    expect(screen.getByTestId('inputSearch').value).toBe(FIRST_TERM_VALID)
    fetchIdTerm.mockReturnValueOnce(mockResFetchIdTermLinux);
    userEvent.click(btnSearch)
    expect(screen.getByTestId('inputSearch').value).toBe('')
    
    const divTerm = await screen.findByTestId(`${FIRST_TERM_VALID}-item-carousel`)
    expect(divTerm).toBeInTheDocument()
    const textTerm = screen.getByTestId(`name-${FIRST_TERM_VALID}`)
    expect(textTerm).toBeInTheDocument()
    expect(textTerm).toHaveTextContent(FIRST_TERM_VALID)
    const deleteTerm = screen.getByRole('button', { name: /delete icon/i })
    expect(deleteTerm).toBeInTheDocument()
    const deleteTermImg = screen.getByRole('img', { name: /delete icon/i })
    expect(deleteTermImg).toBeInTheDocument()
    expect(deleteTermImg).toHaveAttribute('src', 'icon-X-black.svg')
    expect(deleteTermImg).toHaveAttribute('alt', 'Delete icon')

    userEvent.type(inputSearch, FIRST_TERM_VALID)
    userEvent.click(btnSearch)
    expect(inputSearch).toHaveAttribute('placeholder', 'Existing term, enter another')
    
    userEvent.click(deleteTerm)

    const divLoad = await screen.findByTestId('div-load')
    expect(divLoad).toBeInTheDocument()
    const divUrls = screen.getByTestId('div-urls')
    expect(divUrls).toBeInTheDocument()
  })
  it('Search with insufficient characters', () => {
    render(<TermSearch />)
    const inputSearch = screen.getByTestId('inputSearch')
    expect(inputSearch).toBeInTheDocument()
    const btnSearch = screen.getByRole('button', { name: /icon search/i })
    expect(btnSearch).toBeInTheDocument()
    expect(btnSearch).toBeDisabled()

    userEvent.type(inputSearch, FIRST_TERM_INVALID)
    expect(btnSearch).toBeDisabled()
    userEvent.click(btnSearch)
  })
  it('Search with more than enough characters', () => {
    render(<TermSearch />)
    const inputSearch = screen.getByTestId('inputSearch')
    expect(inputSearch).toBeInTheDocument()
    const btnSearch = screen.getByRole('button', { name: /icon search/i })
    expect(btnSearch).toBeInTheDocument()
    expect(btnSearch).toBeDisabled()

    userEvent.type(inputSearch, SECOND_TERM_INVALID)
    expect(btnSearch).toBeDisabled()
    userEvent.click(btnSearch)
  })
})