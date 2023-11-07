import React from 'react'
import { Table } from 'antd'
import { type ReporteTurno } from '../../../types/TurnoType'

const columns = [
  {
    title: 'DPI',
    dataIndex: 'dpi',
    key: 'dpi'
  },
  {
    title: 'Nombres',
    dataIndex: 'nombres',
    key: 'nombres',
    render: (text: string) => <a>{text}</a>
  },
  {
    title: 'Apellidos',
    dataIndex: 'apellidos',
    key: 'apellidos'
  },
  {
    title: 'Cortejo',
    dataIndex: 'nombre_procesion',
    key: 'nombre_procesion'
  },
  {
    title: 'Cantidad turnos',
    dataIndex: 'cantidad',
    key: 'cantidad'
  },
  {
    title: 'Fecha',
    dataIndex: 'fecha',
    key: 'fecha'
  },
  {
    title: 'Turno No.',
    dataIndex: 'turno_numero',
    key: 'turno_numero'
  }
]

interface TurnosPorProcesionProps {
  turnosPorProcesion: ReporteTurno[]
}

const TurnosPorProcesionView: React.FC<TurnosPorProcesionProps> = ({ turnosPorProcesion }: TurnosPorProcesionProps) => {
  return <Table dataSource={turnosPorProcesion} columns={columns} rowKey='turno' />
}

export default TurnosPorProcesionView
