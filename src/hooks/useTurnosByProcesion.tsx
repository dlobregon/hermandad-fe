import { useCallback } from 'react'
import { type TurnoByProcesionQueryParam, TurnosByProcesionQuery } from '../apollo-graphql/mutations/TurnosByProcesionQuery'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useTurnoByProcesion () {
  const [turnosByProcesion] = TurnosByProcesionQuery()
  const handleTurnosByProcesion = useCallback(async (procesion: TurnoByProcesionQueryParam) => {
    const data = await turnosByProcesion(
      { variables: procesion }
    )
    return data
  }, [])

  return {
    handleTurnosByProcesion
  }
}
