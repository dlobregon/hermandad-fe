import { useCallback } from 'react'
import { getClavesDetalleTipoTurnoQuery } from '../apollo-graphql/mutations/getClavesDetalleTipoTurnoMutation'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useGetClavesDetalleTipoTurno () {
  const [getClavesDetalleTipoTurno] = getClavesDetalleTipoTurnoQuery()
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const handleGetClavesDetalleTipoTurno = useCallback(async ({ devoto, tipo_turno }: { devoto: number, tipo_turno: number }) => {
    console.log('devoto', devoto, 'tipo_turno', tipo_turno)
    const data = await getClavesDetalleTipoTurno(
      {
        variables: {
          devoto,
          tipo_turno
        }
      }
    )
    return data
  }, [])

  return {
    handleGetClavesDetalleTipoTurno
  }
}
