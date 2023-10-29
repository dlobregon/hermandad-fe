import React from 'react'
import FormView from '../../ui/FormView'
import { type DevotoFormProps } from '../../../types/DevotoType'

const DevotoForm: React.FC<DevotoFormProps> = (props: DevotoFormProps) => {
  return (
    <FormView {...props}/>
  )
}

export default DevotoForm
