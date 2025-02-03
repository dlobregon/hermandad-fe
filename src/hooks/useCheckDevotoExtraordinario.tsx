import { useCallback } from 'react'
import { type TieneExtraordinarioParams, checkDevotoExtraordinarioQuery } from '../apollo-graphql/mutations/checkDevotoExtraordinarioMutation'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useCheckDevotoExtraordinario () {
  const [checkDevotoExtraordinario] = checkDevotoExtraordinarioQuery()
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const handleCheckDevotoExtraordinario = useCallback(async ({ devoto, tipo_turno, procesion }: TieneExtraordinarioParams) => {
    const data = await checkDevotoExtraordinario(
      {
        variables: {
          devoto,
          tipo_turno,
          procesion
        }
      }
    )
    return data
  }, [])

  return {
    handleCheckDevotoExtraordinario
  }
}
