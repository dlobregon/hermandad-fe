import React from 'react'
import { Table } from 'antd'

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

interface devotoType {
  dpi: number
  nombres: string
  apellidos: string
  telefono: string | null
  email?: string | null | undefined
  altura?: number | null | undefined
}

interface tableListProps {
  data: devotoType []
}

const TableList: React.FC<tableListProps> = ({ data }: tableListProps) => {
  return (
    <>
        <Table dataSource={data} columns={columns} />
    </>
  )
}

export default TableList
