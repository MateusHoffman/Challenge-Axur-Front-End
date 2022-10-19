import React from 'react'
import './Header.css'
import iconGitHub from '../images/Icon-GitHub.png'
import iconLinkedIn from '../images/icon-LinkedIn.png'
import logoH from '../images/Logo-H-Black.svg'

const Header = () => {
  return (
    <div className='header'>
      <div className='div-logo'>
        <img src={ logoH } alt="Logo" />
      </div>
      <div className='div-social'>
        <a href="https://github.com/MateusHoffman/Challenge-Axur-Front-End" target="_blank" rel="noopener noreferrer">
          <img src={ iconGitHub } alt="My GitHub" />
          <span>GitHub</span>
        </a>
        <a href="https://www.linkedin.com/in/mateushoffman/" target="_blank" rel="noopener noreferrer">
          <img src={ iconLinkedIn } alt="My LinkedIn" />
          <span>LinkedIn</span>
        </a>
      </div>
    </div>
  )
}

export default Header