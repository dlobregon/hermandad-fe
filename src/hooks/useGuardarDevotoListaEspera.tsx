import { useCallback } from 'react'
import { type DevotoExtraordinarioEspera } from '../types/TurnoType'
import { guardarDevotoListaEsperaQuery } from '../apollo-graphql/mutations/guardarDevotoListaEsperaMutation'
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useGuardarDevotoListaEspera () {
  const [guardarDevotoListaEspera] = guardarDevotoListaEsperaQuery()
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const handleGuardarDevotoListaEspera = useCallback(async ({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    tipo_turno,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    tipo_procesion,
    devoto
  }: DevotoExtraordinarioEspera) => {
    const data = await guardarDevotoListaEspera(
      {
        variables: {
          tipo_turno,
          tipo_procesion,
          devoto
        }
      }
    )
    return data
  }, [])

  return {
    handleGuardarDevotoListaEspera
  }
}
