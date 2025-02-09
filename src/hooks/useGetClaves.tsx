import { useCallback } from 'react'
import { getClavesQuery } from '../apollo-graphql/mutations/getClavesMutation'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useGetClaves () {
  const [getClaves] = getClavesQuery()
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const handleGetClaves = useCallback(async ({ devoto }: { devoto: number }) => {
    const data = await getClaves(
      {
        variables: {
          devoto
        }
      }
    )
    return data
  }, [])

  return {
    handleGetClaves
  }
}
