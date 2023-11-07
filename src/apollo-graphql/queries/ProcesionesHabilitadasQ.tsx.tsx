import { gql, useQuery } from '@apollo/client'
import { type ProcesionType } from '../../types/ProcesionType'

interface ProcesionesHabilidatadasResponse {
  procesionesHabilitadas: ProcesionType[]
}

const GET_PROCESIONES_HABILIDATADAS = gql`
    query {
        procesionesHabilitadas {
            procesion
            nombre
            fecha
            comentario
            habilitado
        }
    }
`
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function getProcesionesQuery () {
  return useQuery<ProcesionesHabilidatadasResponse>(GET_PROCESIONES_HABILIDATADAS)
}
