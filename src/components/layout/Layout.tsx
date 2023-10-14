import React from 'react'
import Sidebar from './Sidebar'
import ActionBar from './ActionBar'
import { Card } from 'antd'

interface ActionBarProps {
  isForm: boolean
  feature: 'turnos' | 'devotos' | 'inicio'
}

interface Props {
  children: React.ReactNode
  currentPage: number
  handlePage: (page: number) => void
  actionbarOptions: ActionBarProps
  handleActionbarOptions: (options: ActionBarProps) => void
}

const Layout: React.FC<Props> = (props: Props) => {
  const { currentPage, handlePage, actionbarOptions, handleActionbarOptions } = props
  return (
    <>
        <Sidebar currentPage={currentPage} handlePage={handlePage} />
        <ActionBar {...actionbarOptions} handleActionbarOptions={handleActionbarOptions}/>
        <div className='content'>
          <Card>
            {props.children}
          </Card>
        </div>

    </>
  )
}

export default Layout
