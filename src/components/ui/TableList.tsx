import React from 'react'
import { Table } from 'antd'
import type { DevotoType } from '../../types/DevotoType'

const columns = [
  {
    title: 'DPI',
    dataIndex: 'dpi',
    key: 'dpi'
  },
  {
    title: 'Nombres',
    dataIndex: 'nombres',
    key: 'nombres'
  },
  {
    title: 'Apellidos',
    dataIndex: 'apellidos',
    key: 'apellidos'
  },
  {
    title: 'Telefono',
    dataIndex: 'telefono',
    key: 'telefono'
  },
  {
    title: 'Correo',
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: 'Altura',
    dataIndex: 'altura',
    key: 'altura'
  }
]

interface tableListProps {
  data: DevotoType [] | undefined
}

const TableList: React.FC<tableListProps> = ({ data }: tableListProps) => {
  return (
    <>
        <Table dataSource={data} columns={columns} rowKey='dpi'/>
    </>
  )
}

export default TableList
