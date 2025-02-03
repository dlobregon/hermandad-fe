import { useCallback } from 'react'
import { type guardarExtraordinarioProcesionParams, guardarExtraordinarioProcesionQuery } from '../apollo-graphql/mutations/guardarExtraordinarioProcesionMutation'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useGuardarExtraordinarioProcesion () {
  const [guardarExtraordinarioProcesion] = guardarExtraordinarioProcesionQuery()
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const handleGuardarExtraordinarioProcesion = useCallback(async ({
    procesion,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    tipo_turno,
    devoto,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    devoto_extraordinario,
    fecha,
    consesion,
    comentario,
    recibo
  }: guardarExtraordinarioProcesionParams) => {
    const data = await guardarExtraordinarioProcesion(
      {
        variables: {
          procesion,
          tipo_turno,
          devoto,
          devoto_extraordinario,
          fecha,
          consesion,
          comentario,
          recibo
        }
      }
    )
    return data
  }, [])

  return {
    handleGuardarExtraordinarioProcesion
  }
}
