import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import Header from '../components/Header'

describe('Component Header', () => {
  describe('The elements exist', () => {
    it('Logo', () => {
      render(<Header />)
      const imgLogo = screen.getByRole('img', { name: /logo/i })
      expect(imgLogo).toBeInTheDocument()
    })
    it('Button that redirects to GitHub', () => {
      render(<Header />)
      const linkSocial = screen.getByRole('link', { name: /my github github/i })
      expect(linkSocial).toBeInTheDocument()

      const imgSocial = screen.getByRole('img', { name: /my github/i })
      expect(imgSocial).toBeInTheDocument()
    })
  })
  describe('Elements have the correct attributes', () => {
    it('Logo', () => {
      render(<Header />)
      const imgLogo = screen.getByRole('img', { name: /logo/i })
      expect(imgLogo).toHaveAttribute('src', 'Logo-H-Black.svg')
      expect(imgLogo).toHaveAttribute('alt', 'Logo')
    })
    it('Button that redirects to GitHub', () => {
      render(<Header />)
      const linkSocial = screen.getByRole('link', { name: /my github github/i })
      expect(linkSocial).toHaveAttribute('href', 'https://github.com/MateusHoffman/Challenge-Axur-Front-End')
      expect(linkSocial).toHaveAttribute('target', '_blank')

      const imgSocial = screen.getByRole('img', { name: /my github/i })
      expect(imgSocial).toHaveAttribute('src', 'Icon-GitHub.png')
      expect(imgSocial).toHaveAttribute('alt', 'My GitHub')
    })
  })
  describe('Elements have the correct text', () => {
    it('Button that redirects to GitHub', () => {
      render(<Header />)
      const linkSocial = screen.getByRole('link', { name: /my github github/i })
      expect(linkSocial).toHaveTextContent('GitHub')
    })
  })
})