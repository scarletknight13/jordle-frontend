import React from 'react'
import { BiMenu } from 'react-icons/bi';
import {FiInfo} from 'react-icons/fi'
import './header.css'
import logo  from '../../jordle-logo.png'
const Header = ({setModalVisible, setTutorialVisible}) => {
  return (
    <header className='Header'>
        <div className='logo-container'>
          <img className='logo' src={logo} alt="logo" />
        </div>
        <div className='title-container'>
          <h2 className='title'>Jordle</h2>
        </div>
        <div className='header-btn-container'>
            <button className='header-btn' onClick={()=> setModalVisible(true)}><BiMenu color="white" size="lg"/></button>
            <button className='header-btn' onClick={() => setTutorialVisible(true)}><FiInfo color="white" size="lg"/></button>
        </div>
    </header>
  )
}

export default Header