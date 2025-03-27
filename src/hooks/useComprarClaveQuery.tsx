import { useCallback } from 'react'
import { comprarClaveQuery } from '../apollo-graphql/mutations/comprarClaveMutation'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useComprarClave () {
  const [comprarClave] = comprarClaveQuery()
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const handleComprarClave = useCallback(async ({ clave_id }: { clave_id: number }) => {
    const data = await comprarClave(
      {
        variables: {
          clave_id
        }
      }
    )
    return data
  }, [])
  return {
    handleComprarClave
  }
}
