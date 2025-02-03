import { gql, useMutation } from '@apollo/client'
import { type TieneExtraordinario } from '../../types/TurnoType'

export interface TieneExtraordinarioParams {
  devoto: number
  tipo_turno: number
  procesion: number
}

export interface TieneExtraordinarioResponse {
  checkDevotoExtraordinario: TieneExtraordinario
}

const CHECK_EXTRAORDINARIO_DEVOTO = gql`
   mutation checkDevotoExtraordinario(
      $devoto: Int!,
      $tipo_turno: Int!,
      $procesion: Int!,
  
){
    checkDevotoExtraordinario(devoto: $devoto,tipo_turno: $tipo_turno, procesion: $procesion) {
      tipo_turno,
      tiene_extraordinario,
      en_lista_espera,
      ya_cuenta_extraordinario,
      devoto
      devoto_extraordinario
  }
}
`

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function checkDevotoExtraordinarioQuery () {
  return useMutation<TieneExtraordinarioResponse, TieneExtraordinarioParams>(CHECK_EXTRAORDINARIO_DEVOTO)
}
