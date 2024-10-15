import React from 'react'
import { useProcesionesCompletasQuery } from '../../../apollo-graphql/queries/ProcesionesQuery'
import { type ProcesionFormType } from '../../../types/ProcesionType'
import TableCortejo from '../../ui/TableCortejo'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface CortejoListadoProps {
  startEdition: (cortejo: ProcesionFormType) => void
}

const CortejoListado: React.FC<CortejoListadoProps> = (props: CortejoListadoProps) => {
  const { startEdition } = props
  const { data, error, loading } = useProcesionesCompletasQuery()
  if (loading) {
    return <div>cargando... </div>
  }
  if (error != null) {
    console.log(error)
    return <div>Error</div>
  }

  return (
    <>
        <TableCortejo cortejos={data?.procesiones} startEdition={startEdition}/>
    </>
  )
}

export default CortejoListado
