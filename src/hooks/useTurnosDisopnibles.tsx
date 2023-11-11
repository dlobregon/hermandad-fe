import { useCallback } from 'react'
import { type TurnosDisponiblesParams, DisponiblesByProcesionQuery } from '../apollo-graphql/mutations/DisponiblesByProcesion'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useDisponiblesByProcesion () {
  const [turnosByProcesion] = DisponiblesByProcesionQuery()
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const handleDisponiblesByProcesion = useCallback(async ({ procesion, tipo_procesion }: TurnosDisponiblesParams) => {
    const data = await turnosByProcesion(
      {
        variables: {
          procesion,
          tipo_procesion
        }
      }
    )
    return data
  }, [])

  return {
    handleDisponiblesByProcesion
  }
}
