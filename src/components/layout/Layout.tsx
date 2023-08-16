import React from 'react'
import Sidebar from './Sidebar'

interface Props {
  children: React.ReactNode
}

const Layout: React.FC<Props> = (props: Props) => {
  return (
    <>
        <div className='content'>
            {props.children}
        </div>
        <Sidebar />
    </>
  )
}

export default Layout
