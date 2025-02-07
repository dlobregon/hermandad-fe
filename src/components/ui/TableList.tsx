import React, { useState, useRef } from 'react'
import { Table, Space, Tag, Button, Input } from 'antd'
import type { DevotoType } from '../../types/DevotoType'
import type { ColumnsType, ColumnType, TableProps } from 'antd/es/table'
import type { InputRef } from 'antd'
import type { FilterConfirmProps, FilterDropdownProps } from 'antd/es/table/interface'
import { SearchOutlined } from '@ant-design/icons'

interface tableListProps {
  data: DevotoType [] | undefined
  defineCurrentDevoto: (data: DevotoType) => void
  addTurno: (devoto: DevotoType) => void
}

type DataIndex = keyof DevotoType

interface FilterType {
  dpi?: null | string []
  nombres?: null | string []
  apellidos?: null | string[]
  sexo?: null | number []
}

const TableList: React.FC<tableListProps> = ({ data, defineCurrentDevoto, addTurno }: tableListProps) => {
  const [totalShownItems, setTotalShownItems] = useState(data?.length)
  const [currentFilters, setCurrentFilters] = useState<FilterType>({ nombres: null, apellidos: null, dpi: null, sexo: null })
  const [searchText, setSearchText] = useState('')
  const [devotosToShow, setDevotosToShow] = useState<DevotoType [] | undefined>(data)

  const searchInput = useRef<InputRef>(null)

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ): void => {
    confirm()
  }

  const handleReset = (clearFilters: () => void): void => {
    clearFilters()
  }

  const callEdit = (devoto: DevotoType): void => {
    defineCurrentDevoto(devoto)
  }

  const callAddturno = (devoto: DevotoType): void => {
    addTurno(devoto)
  }

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DevotoType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }: FilterDropdownProps): React.ReactNode => (
      <div style={{ padding: 8 }} onKeyDown={(e) => { e.stopPropagation() }}>
        <Input
          ref={searchInput}
          placeholder={`Buscar ${dataIndex}`}
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
            Buscar
          </Button>
          <Button
            onClick={() => { (clearFilters != null) && handleReset(clearFilters) }}
            size="small"
            style={{ width: 90 }}
          >
            Reiniciar
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false })
            }}
          >
            Filtrar
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close()
            }}
          >
            Cerrar
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean): React.ReactNode => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value: React.Key | boolean, record: DevotoType): boolean => record[dataIndex]
      .toString()
      .toLowerCase()
      .includes((value as string).toLowerCase()),
    render: (text: string) => text
  })

  const columns: ColumnsType<DevotoType> = [
    {
      title: 'DPI',
      dataIndex: 'dpi',
      key: 'dpi',
      ellipsis: true,
      width: '12%',
      ...getColumnSearchProps('dpi')
    },
    {
      title: 'Nombres',
      dataIndex: 'nombres',
      key: 'nombres',
      ellipsis: true,
      ...getColumnSearchProps('nombres'),
      width: '15%'
    },
    {
      title: 'Apellidos',
      dataIndex: 'apellidos',
      key: 'apellidos',
      ellipsis: true,
      ...getColumnSearchProps('apellidos'),
      width: '15%'
    },
    {
      title: 'Sexo',
      dataIndex: 'sexo',
      key: 'sexo',
      filters: [{ text: 'Femenino', value: 1 }, { text: 'Masculino', value: 2 }],
      onFilter: (value: boolean | React.Key, devoto) => devoto.sexo === value,
      render: (_: any, devoto: DevotoType) => (
        <Tag color={devoto.sexo === 2 ? 'blue' : 'magenta'}>{devoto.sexo === 2 ? 'Masculino' : 'Femenino' }</Tag>
      ),
      width: '10%'
    },
    {
      title: 'Telefono',
      dataIndex: 'telefono',
      key: 'telefono',
      width: '8%'
    },
    {
      title: 'Correo',
      dataIndex: 'email',
      key: 'email',
      ellipsis: true,
      width: '15%'
    },
    {
      title: 'Altura',
      dataIndex: 'altura',
      key: 'altura',
      width: '10%'
    },
    {
      title: 'Acciones',
      key: 'operation',
      render: (_: any, devoto: DevotoType) => (
        <Space size="middle">
          <Button type="link" size="small" onClick={() => { callEdit(devoto) }}> Editar</Button>
          <Button type="link" size="small" onClick={() => { callAddturno(devoto) }}> Agregar turno</Button>
        </Space>
      )
    }
  ]

  const onChange: TableProps<DevotoType>['onChange'] = (pagination, filters, sorter, extra) => {
    setTotalShownItems(extra?.currentDataSource?.length)
    setCurrentFilters(filters)
  }

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchText(e.target.value)
  }

  const resetSearch = (): void => {
    setSearchText('')
    setDevotosToShow(data)
    setTotalShownItems(data?.length)
  }

  const normalizeText = (text: string): string => {
    return text?.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
  }

  const doGeneralSearch = (value: string): void => {
    if (value === '') {
      return
    }
    const tmpSearch = value.trim()
    const filteredData = data?.filter((devoto) => {
      return normalizeText(devoto?.nombres)?.includes(normalizeText(tmpSearch)) ||
      normalizeText(devoto?.apellidos)?.includes(normalizeText(tmpSearch)) ||
      normalizeText(devoto?.dpi?.toString())?.includes(normalizeText(tmpSearch)) ||
      normalizeText(devoto?.telefono?.toString())?.includes(normalizeText(tmpSearch))
    })
    setDevotosToShow(filteredData)
    setTotalShownItems(filteredData?.length)
  }

  return (
    <>
        <Table
          dataSource={devotosToShow}
          rowKey='devoto'
          size="middle"
          columns={columns}
          onChange={onChange}
          title={() => (
            <div style={ { height: '20px', marginBottom: '10px' } }>
              <Space.Compact style={{ width: '50%' }}>
                <Input value={searchText} onChange={onChangeSearch} placeholder='Buscar por DPI, Nombres, appelidos o telefono'/>
                <Button onClick={() => { doGeneralSearch(searchText) }}>Buscar</Button>
                <Button onClick={resetSearch}>X</Button>
              </Space.Compact>
              &nbsp;
              {currentFilters.dpi != null || currentFilters.nombres != null || currentFilters.apellidos != null || currentFilters.sexo != null ? 'Filtros: ' : '' }
              {(currentFilters.dpi != null) ? <Tag bordered={false}>Dpi:    <strong>{currentFilters.dpi?.[0]}</strong></Tag> : null }
              {(currentFilters.nombres != null) ? <Tag bordered={false}>nombres:     <strong>{currentFilters.nombres?.[0]}</strong></Tag> : null }
              {(currentFilters.apellidos != null) ? <Tag bordered={false}>apellidos:    <strong>{currentFilters.apellidos?.[0]}</strong></Tag> : null }
              {(currentFilters.sexo != null) ? <Tag bordered={false} color={currentFilters.sexo?.[0] === 2 ? 'blue' : 'magenta'}>sexo:     <strong>{currentFilters.sexo?.[0] === 2 ? 'Masculino' : 'Femenino'}</strong></Tag> : null }
              <span style={ { float: 'right' } }>Devotos: {totalShownItems}  </span>
            </div>
          )}
        />
    </>
  )
}

export default TableList
