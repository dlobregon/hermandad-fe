import { gql, useMutation } from '@apollo/client'
import { type DevotoExtraordinarioEspera } from '../../types/TurnoType'

export interface guardarExtraordinarioProcesionResponse {
  guardarDevotoListaEspera: DevotoExtraordinarioEspera
}

const GUARDAR_LISTA_ESPERA = gql`
    mutation guardarDevotoListaEspera(
        $tipo_turno:   Int!,
        $tipo_procesion: Int!,
        $devoto:       Int!
    ) {
    guardarDevotoListaEspera(
        tipo_turno: $tipo_turno,
            tipo_procesion: $tipo_procesion,
        devoto: $devoto
        
    ){
        tipo_turno,
        tipo_procesion
    }
    }
`

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function guardarDevotoListaEsperaQuery () {
  return useMutation<guardarExtraordinarioProcesionResponse, DevotoExtraordinarioEspera>(GUARDAR_LISTA_ESPERA)
}
