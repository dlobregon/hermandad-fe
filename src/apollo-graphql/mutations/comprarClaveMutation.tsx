import { gql, useMutation } from '@apollo/client'
import { type ComprarClave } from '../../types/TurnoType'

export interface comprarClaveResponse {
  comprarClave: ComprarClave
}
export interface comprarClaveParams {
  clave_id: number
}

const COMPRAR_CLAVE = gql`
  mutation compraClave($clave_id: Int!) {
    comprarClave(clave_id: $clave_id) {
      clave_id
    }
  }
`
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function comprarClaveQuery () {
  return useMutation<comprarClaveResponse, comprarClaveParams>(COMPRAR_CLAVE)
}
