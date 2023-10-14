import React from 'react'
import TableList from '../../ui/TableList'
import { useDevotosQuery } from '../../../apollo-graphql/queries/DevotosQuery'

const DevotoListado: React.FC = () => {
  const { data, error, loading } = useDevotosQuery()
  if (loading) {
    return <div>loading... </div>
  }
  if (error != null) {
    console.log(error)
    return <div>Error</div>
  }
  return (
    <>
            <TableList data={data?.devotos}/>
    </>
  )
}

export default DevotoListado
