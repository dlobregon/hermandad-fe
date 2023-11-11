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
    title: 'Turno No.',
    dataIndex: 'nombre_turno',
    key: 'nombre_turno'
  },
  {
    title: 'Cantidad turnos',
    dataIndex: 'cantidad',
    key: 'cantidad'
  },
  {
    title: 'No recibo',
    dataIndex: 'recibo',
    key: 'recibo'
  },
  {
    title: 'Fecha registro',
    dataIndex: 'fecha',
    key: 'fecha'
  }
]

interface TurnosPorProcesionProps {
  turnosPorProcesion: ReporteTurno[]
}

const TurnosPorProcesionView: React.FC<TurnosPorProcesionProps> = ({ turnosPorProcesion }: TurnosPorProcesionProps) => {
  return <Table dataSource={turnosPorProcesion} columns={columns} rowKey='turno' />
}

export default TurnosPorProcesionView
