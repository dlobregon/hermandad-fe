import React, { useState } from 'react'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from './apollo-graphql/ApolloClient'
import Layout from './components/layout/Layout'
import './App.css'
import './sidebar.css'
import './actionbar.css'

import Devotos from './components/features/Devotos'
import Inicio from './components/features/Inicio'
import Turnos from './components/features/Turnos'

interface ActionBarProps {
  isForm: boolean
  feature: 'turnos' | 'devotos' | 'inicio'
}

const App: React.FC = () => {
  const [currentPage, setPage] = useState(0)
  const [actionbarOptions, setActionbarOptions] = useState <ActionBarProps>({ isForm: false, feature: 'inicio' })

  const handleActionbarOptions = (options: ActionBarProps): void => {
    setActionbarOptions(options)
  }

  const handlePage = (page: number): void => {
    setPage(page)
    if (page === 0 && actionbarOptions.feature !== 'inicio') {
      setActionbarOptions({ isForm: false, feature: 'inicio' })
    } else if (page === 1 && actionbarOptions.feature !== 'devotos') {
      setActionbarOptions({ isForm: false, feature: 'devotos' })
    } else if (page === 2 && actionbarOptions.feature !== 'turnos') {
      setActionbarOptions({ isForm: false, feature: 'turnos' })
    }
  }
  return (
    <ApolloProvider client={apolloClient}>
      <Layout currentPage={currentPage} handlePage={handlePage} handleActionbarOptions={handleActionbarOptions} actionbarOptions={actionbarOptions}>
      {
        currentPage === 0
          ? <Inicio />
          : currentPage === 1
            ? <Devotos isForm={actionbarOptions.isForm}/>
            : <Turnos />
      }

      </Layout>
    </ApolloProvider>
  )
}

export default App
