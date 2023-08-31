import React from 'react'
import DevotoListado from './DevotoListado'
import DevotoForm from './DevotoForm'

interface DevotosProps {
  isForm: boolean
}

const Devotos: React.FC<DevotosProps> = ({ isForm }: DevotosProps) => {
  return (
    <>
      {
        !isForm
          ? <DevotoListado />
          : <DevotoForm />
      }
    </>
  )
}

export default Devotos
