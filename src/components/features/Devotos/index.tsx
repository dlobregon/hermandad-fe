import React, { useState, useEffect } from 'react'
import { type DevotoType, type DevotoFormType } from '../../../types/DevotoType'
import DevotoListado from './DevotoListado'
import DevotoForm from './DevotoForm'

interface DevotosProps {
  isForm: boolean
  handleForm: (enable: boolean) => void
}

const initialFormValues = {
  devoto: undefined,
  dpi: undefined,
  nombres: undefined,
  apellidos: undefined,
  altura: 1,
  email: undefined,
  sexo: undefined,
  telefono: undefined
}

const Devotos: React.FC<DevotosProps> = ({ isForm, handleForm }: DevotosProps) => {
  const [currentDevoto, setCurrentDevoto] = useState<DevotoFormType>(initialFormValues)
  const [isEdition, setIsEdition] = useState(false)
  const [isTurno, setIsturno] = useState(false)

  useEffect(() => {
    if (!isForm) {
      resetDevoto()
      setIsturno(false)
    }
  }, [isForm])
  const defineCurrentDevoto = (devoto: DevotoType): void => {
    setIsEdition(true)
    setCurrentDevoto(devoto)
    handleForm(true)
  }

  const resetDevoto = (): void => {
    setIsEdition(false)
    setCurrentDevoto(initialFormValues)
  }

  const addTurno = (devoto: DevotoType): void => {
    setIsturno(true)
    setCurrentDevoto(devoto)
    setIsEdition(true)
    handleForm(true)
  }

  return (
    <>
      {
        !isForm
          ? <DevotoListado addTurno={addTurno} defineCurrentDevoto={defineCurrentDevoto}/>
          : <DevotoForm isEdition={isEdition} devotoData={currentDevoto} isTurno={isTurno} resetDevoto={resetDevoto}/>
      }
    </>
  )
}

export default Devotos
