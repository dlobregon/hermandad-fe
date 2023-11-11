import { gql, useMutation } from '@apollo/client'
import { type TurnosDisponibles } from '../../types/TurnoType'

export interface TurnosDisponiblesResponse {
  disponiblesByProcesion: TurnosDisponibles []
}

export interface TurnosDisponiblesParams {
  procesion: number
  tipo_procesion: number
}

const GET_TURNOS_DISPONIBLES = gql`
    mutation disponiblesByProcesion($procesion: Int!, $tipo_procesion: Int!) {
        disponiblesByProcesion(procesion: $procesion,tipo_procesion: $tipo_procesion) {
            tipo_turno
            nombre
            disponibles
    }
}
`

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function DisponiblesByProcesionQuery () {
  return useMutation<TurnosDisponiblesResponse, TurnosDisponiblesParams>(GET_TURNOS_DISPONIBLES)
}
