import { useCallback } from 'react'
import { agregarNuevaClaveQuery } from '../apollo-graphql/mutations/agregarNuevaClaveMutation'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useAgregarNuevaClave () {
  const [agregarNuevaClave] = agregarNuevaClaveQuery()
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const handleAgregarNuevaClave = useCallback(async ({ devoto, tipo_turno, codigo }: { devoto: number, tipo_turno: number, codigo: string }) => {
    const data = await agregarNuevaClave(
      {
        variables: {
          devoto,
          tipo_turno,
          codigo
        }
      }
    )
    return data
  }, [])
  return {
    handleAgregarNuevaClave
  }
}
