import { useCallback } from 'react'
import { getClavesDetalleTipoTurnoQuery } from '../apollo-graphql/mutations/getClavesDetalleTipoTurnoMutation'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useGetClavesDetalleTipoTurno () {
  const [getClavesDetalleTipoTurno] = getClavesDetalleTipoTurnoQuery()
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const handleGetClavesDetalleTipoTurno = useCallback(async ({ devoto }: { devoto: number }) => {
    const data = await getClavesDetalleTipoTurno(
      {
        variables: {
          devoto
        }
      }
    )
    return data
  }, [])

  return {
    handleGetClavesDetalleTipoTurno
  }
}
