import { gql, useMutation } from '@apollo/client'
import { type DevotoType } from '../../types/DevotoType'

interface EditDevotoVariables {
  devoto: number
  dpi: number
  nombres: string
  apellidos: string
  sexo: number
  telefono?: string | null
  email?: string | null | undefined
  altura?: number | null | undefined
}

interface EditDevotoResponse {
  editDevoto: DevotoType
}

const EDIT_DEVOTO = gql`
    mutation editDevoto(
        $devoto: ID!,
        $dpi:Float!, 
        $nombres: String!,
        $apellidos: String!, 
        $sexo: Int!, 
        $altura:Float, 
        $telefono: String,
        $email: String
        ) {
        editDevoto(
            devoto: $devoto,
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
export function editDevotoMutation () {
  return useMutation<EditDevotoResponse, EditDevotoVariables>(EDIT_DEVOTO)
}
