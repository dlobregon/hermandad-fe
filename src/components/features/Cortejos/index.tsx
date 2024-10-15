import React, { useState } from 'react'
import CortejoListado from './CorrtejoListado'
import CortejoForm from './CortejoForm'
import { type ProcesionFormType } from '../../../types/ProcesionType'
import { Modal } from 'antd'
import dayjs from 'dayjs'

interface CortejoProps {
  isForm: boolean
  handleForm: (enable: boolean) => void
}

const initialValues = {
  procesion: undefined,
  nombre: undefined,
  fecha: undefined,
  comentario: undefined,
  habilitado: undefined,
  tipo_procesion: undefined,
  sexo: undefined,
  brazos: undefined,
  total_turnos: undefined
}

const Cortejos: React.FC<CortejoProps> = ({ isForm, handleForm }: CortejoProps) => {
  const [isEdition, setIsEdition] = useState(false)
  const [currentCortejo, setCurrentCortejo] = useState<ProcesionFormType>(initialValues)

  const startEdition = (cortejo: ProcesionFormType): void => {
    const tmpCortejo = { ...cortejo, fecha: dayjs(currentCortejo?.fecha, 'DD-MM-YYYY') }
    setCurrentCortejo({ ...tmpCortejo })
    setIsEdition(true)
    handleForm(true)
  }

  const restartModal = (): void => {
    setCurrentCortejo(initialValues)
    setIsEdition(false)
    handleForm(false)
  }

  return (
    <>
      <CortejoListado startEdition={startEdition}/>
      <Modal
        title={!isEdition ? 'Nuevo Cortejo' : 'Editar Cortejo  '}
        centered
        open={isForm}
        onOk={() => { handleForm(false) }}
        onCancel={() => { restartModal() }}
        width={1000}
        afterClose={() => { setCurrentCortejo(initialValues) }}
      >
        <CortejoForm currentCortejo={currentCortejo} />
      </Modal>
    </>
  )
}

export default Cortejos
