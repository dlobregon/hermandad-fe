import { gql, useMutation } from '@apollo/client'
import { type ResultadoNuevaClave } from '../../types/TurnoType'

export interface agregarNuevaClaveResponse {
  agregarNuevaClave: ResultadoNuevaClave
}
export interface ResultadoNuevaClaveParams {
  devoto: number
  tipo_turno: number
  codigo: string
}

const AGREGAR_NUEVA_CLAVE = gql`
  mutation agregarNuevaClave($devoto: Int!, $tipo_turno: Int!, $codigo: String!) {
    agregarNuevaClave(devoto: $devoto, tipo_turno: $tipo_turno, codigo: $codigo) {
      devoto
      tipo_turno
      codigo
    }
  }
`

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function agregarNuevaClaveQuery () {
  return useMutation<agregarNuevaClaveResponse, ResultadoNuevaClaveParams>(AGREGAR_NUEVA_CLAVE)
}
