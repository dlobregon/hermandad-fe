import { gql, useMutation } from '@apollo/client'
import { type DevotoType } from '../../types/DevotoType'

interface CreateDevotoVariables {
  dpi: number
  nombres: string
  apellidos: string
  sexo: number
  telefono?: string | null
  email?: string | null | undefined
  altura?: number | null | undefined
}

interface CreateDevotoResponse {
  createDevoto: DevotoType
}

const CREATE_DEVOTO = gql`
    mutation createDevoto(
        $dpi:Float!, 
        $nombres: String!,
        $apellidos: String!, 
        $sexo: Int!, 
        $altura:Float, 
        $telefono: String,
        $email: String
    ) {
        createDevoto(
            dpi:$dpi, 
            nombres: $nombres, 
            apellidos: $apellidos,
            sexo: $sexo, 
            altura: $altura, 
            telefono: $telefono,
            email: $email
        ) {
            devoto
            dpi
            nombres
        }
    }   
`

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createDevotoMutation () {
  return useMutation<CreateDevotoResponse, CreateDevotoVariables>(CREATE_DEVOTO)
}
