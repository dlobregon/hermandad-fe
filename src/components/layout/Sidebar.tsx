import React from 'react'
import Icon from '../icons/Icon'
import Escudo from '../../assets/escudo-fondo-transparente-two.png'

interface Props {
  currentPage: number
  handlePage: (page: number) => void
}

const Sidebar: React.FC <Props> = (props: Props) => {
  const { currentPage, handlePage } = props
  const handleSelection = (index: number): void => { handlePage(index) }

  return (
    <div className="sidenav">
        <div className='sidenav-header'>
            <img id="escudo-header" src={Escudo}/>
        </div>
        <div className={currentPage === 0 ? 'sidenav-items-selected' : 'sidenav-items'} onClick={() => { handleSelection(0) }} >
            <div className='sidenav-icon'>
                <Icon name='home'/>
            </div>
            <div className='sidenav-text'>
                <span>Inicio</span>
            </div>
        </div>
        <div className={currentPage === 1 ? 'sidenav-items-selected' : 'sidenav-items'} onClick={() => { handleSelection(1) }}>
            <div className='sidenav-icon'>
                <Icon name='devoto' />
            </div>
            <div className='sidenav-text'>
                <span>Devotos</span>
            </div>
        </div>
        <div className={currentPage === 2 ? 'sidenav-items-selected' : 'sidenav-items'} onClick={() => { handleSelection(2) }}>
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
