import { gql, useQuery } from '@apollo/client'
import { type DevotoType } from '../../types/DevotoType'

interface DevotosQueryResponse {
  devotos: DevotoType[]
  /*
  data: {
    devotos: DevotoType[]
  }
  loading: boolean
  error?: Error
  */
}

const GET_DEVOTOS = gql`
    query {
        devotos {
            devoto
            dpi
            nombres
            apellidos
            sexo
            telefono
            email
            altura
            
        }
    }
`

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useDevotosQuery () {
  return useQuery<DevotosQueryResponse>(GET_DEVOTOS)
}
