import React from 'react'
import TableList from '../../ui/TableList'
import { useDevotosQuery } from '../../../apollo-graphql/queries/DevotosQuery'
import { type DevotoType } from '../../../types/DevotoType'

interface DevotoListadoProps {
  defineCurrentDevoto: (devoto: DevotoType) => void
  addTurno: (devoto: DevotoType) => void
}

const DevotoListado: React.FC<DevotoListadoProps> = (props: DevotoListadoProps) => {
  const { defineCurrentDevoto, addTurno } = props
  const { data, error, loading } = useDevotosQuery()
  if (loading) {
    return <div>cargando... </div>
  }
  if (error != null) {
    console.log(error)
    return <div>Error</div>
  }
  return (
    <>
      <TableList addTurno={addTurno} defineCurrentDevoto={defineCurrentDevoto} data={data?.devotos}/>
    </>
  )
}

export default DevotoListado
