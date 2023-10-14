import React, { useState, useRef } from 'react'
import { Table, Space, Tag, Button, Input } from 'antd'
import type { DevotoType } from '../../types/DevotoType'
import type { ColumnsType, ColumnType, TableProps } from 'antd/es/table'
import type { InputRef } from 'antd'
import type { FilterConfirmProps, FilterDropdownProps } from 'antd/es/table/interface'
import { SearchOutlined } from '@ant-design/icons'

interface tableListProps {
  data: DevotoType [] | undefined
}

/* interface DevotoTable extends Devoto {
  filterDropdown: (params: FilterDownTypes) => any
} */

type DataIndex = keyof DevotoType

const TableList: React.FC<tableListProps> = ({ data }: tableListProps) => {
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')
  const searchInput = useRef<InputRef>(null)

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ): void => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  const handleReset = (clearFilters: () => void): void => {
    clearFilters()
    setSearchText('')
  }

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DevotoType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }: FilterDropdownProps): React.ReactNode => (
      <div style={{ padding: 8 }} onKeyDown={(e) => { e.stopPropagation() }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => { setSelectedKeys((e.target.value.length > 0) ? [e.target.value] : []) }}
          onPressEnter={() => { handleSearch(selectedKeys as string[], confirm, dataIndex) }}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => { handleSearch(selectedKeys as string[], confirm, dataIndex) }}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => { (clearFilters != null) && handleReset(clearFilters) }}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false })
              setSearchText((selectedKeys as string[])[0])
              setSearchedColumn(dataIndex)
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close()
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean): React.ReactNode => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    /* onFilter: (value: React.Key | boolean, record: DevotoType): boolean => record[dataIndex]
      .toString()
      .toLowerCase()
      .includes((value as string).toLowerCase()), */
    onFilter: (value: React.Key | boolean, record: DevotoType): boolean => {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (record[dataIndex]) {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        return record[dataIndex].toString().toLowerCase().includes((value as string).toLowerCase())
      }
      return false
    },
    render: (text: string) => text
  })

  const columns: ColumnsType<DevotoType> = [
    {
      title: 'DPI',
      dataIndex: 'dpi',
      key: 'dpi',
      ...getColumnSearchProps('dpi')
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
      title: 'Sexo',
      dataIndex: 'sexo',
      key: 'sexo',
      filters: [{ text: 'Mujer', value: 1 }, { text: 'Hombre', value: 2 }],
      onFilter: (value: boolean | React.Key, devoto) => devoto.sexo === value,
      render: (_: any, devoto: DevotoType) => (
        <Tag color={devoto.sexo === 2 ? 'blue' : 'magenta'}>{devoto.sexo === 2 ? 'hombre' : 'mujer' }</Tag>
      )
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
    },
    {
      title: 'Acciones',
      key: 'operation',
      render: (_: any, devoto: DevotoType) => (
        <Space size="middle">
          <a>Editar</a>
          <a>Eliminar</a>
        </Space>
      )
    }
  ]

  const onChange: TableProps<DevotoType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra)
  }

  return (
    <>
        <Table dataSource={data} rowKey='devoto' size="middle" columns={columns} onChange={onChange}/>
    </>
  )
}

export default TableList
