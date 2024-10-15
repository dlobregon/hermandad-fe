import React from 'react'
import { Table, Tag, Button } from 'antd'
import { type ProcesionType, type ProcesionFormType } from '../../types/ProcesionType'

interface TableCortejoProps {
  cortejos: ProcesionType[] | undefined
  startEdition: (cortejo: ProcesionFormType) => void
}

const TableCortejo: React.FC<TableCortejoProps> = (props: TableCortejoProps) => {
  const { cortejos, startEdition } = props

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      key: 'nombre'
    },
    {
      title: 'Fecha',
      dataIndex: 'fecha',
      key: 'fecha'
    },
    {
      title: 'Brazos por Turno',
      dataIndex: 'brazos',
      key: 'brazos'
    },
    {
      title: 'Inscripción',
      data: 'habilitado',
      key: 'habilitado',
      render: (_: any, cortejo: ProcesionType) => (<Tag color={ cortejo.habilitado ? 'green' : 'magenta'}> {cortejo.habilitado ? 'Abierta' : 'Cerrada'} </Tag>)
    },
    {
      title: 'Acciones',
      key: 'operation',
      render: (_: any, cortejo: ProcesionType) => (
        <Button type='link' size='small' onClick={() => { startEdition(cortejo) }}>Editar</Button>
      )
    }
  ]
  return <Table dataSource={cortejos} columns={columns} rowKey='procesion' />
}

export default TableCortejo
