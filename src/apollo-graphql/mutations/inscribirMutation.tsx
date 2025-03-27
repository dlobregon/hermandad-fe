import { gql, useMutation } from '@apollo/client'
import { type Inscripcion } from '../../types/TurnoType'

export interface inscribirResponse {
  inscribir: Inscripcion
}
export interface inscribirParams {
  devoto: number
  comentarios: string
  cantidad: number
  claves: number[]
}

const INSCRIBIR = gql`
    mutation inscribir($devoto: Int!, $comentarios: String, $cantidad: Int, $claves: [Int]) {
    inscribir(devoto: $devoto, comentarios: $comentarios, cantidad: $cantidad, claves: $claves ){
      devoto,
      comentarios,
      cantidad,
      claves,
  }
}
`
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function inscribirQuery () {
  return useMutation<inscribirResponse, inscribirParams>(INSCRIBIR)
}
