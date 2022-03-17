import React from 'react'
import './Navbar.scss'
import Logo from '../../logo.svg'
const Navbar = () => {
  return (
    <div className="navbarContainer">
      <img src={Logo} alt="Logo"/>
      <div className="logoText">

        LOGO
      </div>

    </div>
  )
}

export default Navbar