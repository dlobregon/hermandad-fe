import { gql, useMutation } from '@apollo/client'
import { type TurnoForm, type Turno } from '../../types/TurnoType'

interface CreateTurnoResponse {
  createTurno: Turno
}

const CREATE_TURNO = gql`
    mutation createTurno(
        $numero: Int!,
        $recibo: Int!,
        $fecha: Date!,
        $tipo_turno: Int!,
        $usuario: Int!,
        $devoto: Int!,
        $procesion: Int!, 
        $cantidad: Int!
        ) {
        createTurno(
            numero: $numero,
            recibo: $recibo,
            fecha: $fecha,
            tipo_turno: $tipo_turno,
            usuario: $usuario,
            devoto: $devoto,
            procesion: $procesion, 
            cantidad: $cantidad,
        ) {
            turno
            numero
            recibo
            fecha
            recibo 
            fecha
            tipo_turno
            devoto
        }
    }
`
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createTurnoMutation () {
  return useMutation<CreateTurnoResponse, TurnoForm>(CREATE_TURNO)
}
