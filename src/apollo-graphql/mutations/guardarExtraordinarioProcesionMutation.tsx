import { gql, useMutation } from '@apollo/client'
import { type CortejoExtraordinario } from '../../types/TurnoType'

export interface guardarExtraordinarioProcesionParams {
  procesion: number
  tipo_turno: number
  devoto: number
  devoto_extraordinario: number
  fecha: string
  consesion?: string
  comentario?: string
  recibo?: string
}

export interface guardarExtraordinarioProcesionResponse {
  guardarExtraordinarioProcesion: CortejoExtraordinario
}

const GUARDAR_EXTRAORDINARIO_PROCESION = gql`
  mutation guardarExtraordinarioProcesion(
      $procesion:    Int!,
      $tipo_turno:   Int!,
      $devoto:       Int!,
      $devoto_extraordinario: Int!,
      $fecha:       String!,
      $consesion:   String,
      $comentario:  String,
      $recibo:      String,
) {
  guardarExtraordinarioProcesion(
      procesion: $procesion,
      tipo_turno: $tipo_turno,
      devoto: $devoto,
      devoto_extraordinario: $devoto_extraordinario,
      fecha: $fecha,
      consesion: $consesion,
      comentario: $comentario,
      recibo: $recibo,
  ){
    procesion
    devoto
  }
}
`

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function guardarExtraordinarioProcesionQuery () {
  return useMutation<guardarExtraordinarioProcesionResponse, guardarExtraordinarioProcesionParams>(GUARDAR_EXTRAORDINARIO_PROCESION)
}
