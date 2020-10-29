import React from 'react'
import './Header.css'
import logo from './medical-pill-outline.svg'

const Header = () =>
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <span className="App-title">Medication list</span>
  </header>

export default Header;
