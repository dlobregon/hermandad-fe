import React, { useState } from 'react'
import Icon from '../icons/Icon'

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const handleTrigger = (): void => { setIsOpen(!isOpen) }

  return (
    <div className={`sidebar${isOpen ? ' sidebar--open' : ''}`}>
        <div className="trigger" onClick={handleTrigger}>
            <Icon name='menu' />
        </div>

        <div className="sidebar-position">
            <Icon name='home' />
            <span>Inicio</span>
        </div>
        <div className="sidebar-position">
            <Icon name='people' />
            <span>Devotos</span>
        </div>
        <div className="sidebar-position">
            <Icon name='turno' />
            <span>turnos</span>
        </div>

        <div className="sidebar-position">
            <span>Position 4</span>
        </div>
    </div>
  )
}

export default Sidebar
