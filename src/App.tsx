import React, { useState } from 'react'
import Layout from './components/layout/Layout'
import './App.css'
import './sidebar.css'
import Devotos from './components/features/Devotos'
import Inicio from './components/features/Inicio'
import Turnos from './components/features/Turnos'

const App: React.FC = () => {
  const [currentPage, setPage] = useState(0)

  const handlePage = (page: number): void => {
    setPage(page)
  }
  return (
    <Layout currentPage={currentPage} handlePage={handlePage}>
      {
        currentPage === 0
          ? <Inicio />
          : currentPage === 1
            ? <Devotos />
            : <Turnos />
      }

    </Layout>
  )
}

export default App
