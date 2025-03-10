import React, { useState, useEffect } from 'react'
import Icon from '../icons/Icon'
import { Button } from 'antd'

interface ActionhandlerParams {
  isForm: boolean
  feature: 'turnos' | 'devotos' | 'inicio' | 'cortejos'
}
interface ActionBarProps {
  isForm: boolean
  feature: 'turnos' | 'devotos' | 'inicio' | 'cortejos'
  handleActionbarOptions: (params: ActionhandlerParams) => void
}

const ActionBar: React.FC<ActionBarProps> = ({ isForm, feature, handleActionbarOptions }: ActionBarProps) => {
  const [showBack, setShowBack] = useState(false)
  const [buttonText, setButtonText] = useState('')
  const [title, setTitle] = useState('inicio')

  const handleActionButton = (): void => {
    const newOptions = { isForm: true, feature }
    handleActionbarOptions(newOptions)
  }

  const handleBackButton = (): void => {
    const newOptions = { isForm: false, feature }
    handleActionbarOptions(newOptions)
  }

  const handleSalirButton = (): void => {
    localStorage.clear()
    window.location.reload()
  }

  useEffect(() => {
    if (isForm) {
      setShowBack(true)
      if (feature === 'turnos') {
        setTitle('Turno')
      } else if (feature === 'devotos') {
        setTitle('Devoto')
      } else if (feature === 'inicio') {
        setTitle('inicio')
      } else if (feature === 'cortejos') {
        setTitle('Cortejo')
      }
    } else {
      setShowBack(false)
      if (feature === 'turnos') {
        setTitle('Listado Turnos')
        setButtonText('nuevo turno')
      } else if (feature === 'devotos') {
        setTitle('Listado de Devotos')
        setButtonText('Registar devoto')
      } else if (feature === 'inicio') {
        setTitle('inicio')
      } else if (feature === 'cortejos') {
        setTitle('Lista de Cortejos')
        setButtonText('Crear cortejo')
      }
    }
  }, [isForm, feature])

  return (
    <div className='actionbar'>
       <div className='actionbar-backspace'>
          { showBack
            ? <div className='actionbar-backspace-icon' onClick={handleBackButton} >
                <Icon name='backArrow'/>
              </div>
            : ''}
       </div>
       <div className='actionbar-title'>{title}</div>
       <div className='actionbar-actions'>
       <Button type='text' className='button-salir' onClick={handleSalirButton}> Salir </Button>
          {
            !showBack && feature !== 'inicio' && feature !== 'turnos'
              ? <button className='button-nuevo' onClick={handleActionButton}>{buttonText}</button>
              : ''
          }
       </div>
    </div>
  )
}

export default ActionBar
