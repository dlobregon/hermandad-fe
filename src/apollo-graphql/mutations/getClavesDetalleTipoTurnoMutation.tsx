import { gql, useMutation } from '@apollo/client'
import { type DetalleTipoTurnoClave } from '../../types/TurnoType'

export interface getClavesDetalleTipoTurnoResponse {
  getClavesDetalleTipoTurno: DetalleTipoTurnoClave []
}
export interface getClavesDetalleTipoTurnoParams {
  devoto: number
}

const GET_CLAVES_DETALLE_TIPO_TURNO = gql`
  mutation getClavesDetalleTipoTurno($devoto: Int!) {
    getClavesDetalleTipoTurno(devoto: $devoto) {
          nombre_tipo_turno
          clave
          disponible
    }
  }
`
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function getClavesDetalleTipoTurnoQuery () {
  return useMutation<getClavesDetalleTipoTurnoResponse, getClavesDetalleTipoTurnoParams>(GET_CLAVES_DETALLE_TIPO_TURNO)
}
