import React from 'react'
import Sidebar from './Sidebar'

interface Props {
  children: React.ReactNode
  currentPage: number
  handlePage: (page: number) => void
}

const Layout: React.FC<Props> = (props: Props) => {
  const { currentPage, handlePage } = props
  return (
    <>
        <div className='content'>
            {props.children}
        </div>
        <Sidebar currentPage={currentPage} handlePage={handlePage} />
    </>
  )
}

export default Layout
