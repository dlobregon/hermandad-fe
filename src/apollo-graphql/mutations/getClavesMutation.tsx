import { gql, useMutation } from '@apollo/client'
import { type DevotoClave } from '../../types/TurnoType'

export interface getClavesResponse {
  getClaves: DevotoClave []
}
export interface getClavesParams {
  devoto: number
}

const GET_CLAVES = gql`
    mutation getClaves ($devoto: Int!) {
        getClaves(devoto: $devoto){
            clave
        }
    }
`

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function getClavesQuery () {
  return useMutation<getClavesResponse, getClavesParams>(GET_CLAVES)
}
