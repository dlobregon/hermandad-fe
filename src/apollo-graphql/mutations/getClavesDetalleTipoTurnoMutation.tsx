import { gql, useMutation } from '@apollo/client'
import { type DetalleTipoTurnoClave } from '../../types/TurnoType'

export interface getClavesDetalleTipoTurnoResponse {
  getClavesDetalleTipoTurno: DetalleTipoTurnoClave []
}
export interface getClavesDetalleTipoTurnoParams {
  devoto: number
  tipo_turno: number
}

const GET_CLAVES_DETALLE_TIPO_TURNO = gql`
  mutation getClavesDetalleTipoTurno($devoto: Int!, $tipo_turno: Int!) {
    getClavesDetalleTipoTurno(devoto: $devoto, tipo_turno: $tipo_turno) {
          nombre_tipo_turno
          clave
          disponible
          clave_id
    }
  }
`
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function getClavesDetalleTipoTurnoQuery () {
  return useMutation<getClavesDetalleTipoTurnoResponse, getClavesDetalleTipoTurnoParams>(GET_CLAVES_DETALLE_TIPO_TURNO)
}
