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

  useEffect(() => {
    if (!isForm) {
      resetDevoto()
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

  return (
    <>
      {
        !isForm
          ? <DevotoListado defineCurrentDevoto={defineCurrentDevoto}/>
          : <DevotoForm isEdition={isEdition} devotoData={currentDevoto} resetDevoto={resetDevoto}/>
      }
    </>
  )
}

export default Devotos
