import React, { useState } from 'react'
import Icon from '../icons/Icon'
import Escudo from '../../assets/escudo-fondo-transparente-two.png'

const Sidebar: React.FC = () => {
  const [isSelected, setSelection] = useState(0)
  const handleSelection = (index: number): void => { setSelection(index) }

  return (
    <div className="sidenav">
        <div className='sidenav-header'>
            <img id="escudo-header" src={Escudo}/>
        </div>
        <div className={isSelected === 0 ? 'sidenav-items-selected' : 'sidenav-items'} onClick={() => { handleSelection(0) }} >
            <div className='sidenav-icon'>
                <Icon name='home'/>
            </div>
            <div className='sidenav-text'>
                <span>Inicio</span>
            </div>
        </div>
        <div className={isSelected === 1 ? 'sidenav-items-selected' : 'sidenav-items'} onClick={() => { handleSelection(1) }}>
            <div className='sidenav-icon'>
                <Icon name='people' />
            </div>
            <div className='sidenav-text'>
                <span>Devotos</span>
            </div>
        </div>
        <div className={isSelected === 2 ? 'sidenav-items-selected' : 'sidenav-items'} onClick={() => { handleSelection(2) }}>
            <div className='sidenav-icon'>
                <Icon name='turno' />
            </div>
            <div className='sidenav-text'>
                <span>Turnos</span>
            </div>
        </div>
    </div>
  )
}

export default Sidebar
