import { useCallback } from 'react'
import { inscribirQuery } from '../apollo-graphql/mutations/inscribirMutation'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useInscribir () {
  const [inscribir] = inscribirQuery()
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const handleInscribir = useCallback(async ({ devoto, comentarios, cantidad, claves }: { devoto: number, comentarios: string, cantidad: number, claves: number[] }) => {
    const data = await inscribir(
      {
        variables: {
          devoto,
          comentarios,
          cantidad,
          claves
        }
      }
    )
    return data
  }, [])
  return {
    handleInscribir
  }
}
