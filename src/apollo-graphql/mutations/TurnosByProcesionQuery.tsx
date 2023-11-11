import { gql, useMutation } from '@apollo/client'
import { type ReporteTurno } from '../../types/TurnoType'

interface TurnoByProcesionQueryResponse {
  turnosByProcesion: ReporteTurno[]
}

export interface TurnoByProcesionQueryParam {
  procesion: number
}

const GET_TURNOS_BY_PROCESION = gql`
    mutation turnosByProcesion($procesion: Int!) {
        turnosByProcesion(procesion: $procesion) {
            turno
            dpi
            nombres
            apellidos
            nombre_procesion
            cantidad
            fecha
            nombre_turno
            recibo
        }
    }
`

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function TurnosByProcesionQuery () {
  return useMutation<TurnoByProcesionQueryResponse, TurnoByProcesionQueryParam>(GET_TURNOS_BY_PROCESION)
}
