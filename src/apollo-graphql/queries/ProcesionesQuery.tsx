import { gql, useQuery } from '@apollo/client'
import { type ProcesionType } from '../../types/ProcesionType'

interface ProcesionQueryResponse {
  procesiones: ProcesionType[]
}

const GET_PROCESIONES = gql`
   query procesiones {
        procesiones{
            procesion
            nombre
            habilitado
            fecha
            tipo_procesion
            comentario
            brazos
            total_turnos
        }
    }
`

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useProcesionesCompletasQuery () {
  return useQuery<ProcesionQueryResponse>(GET_PROCESIONES)
}
