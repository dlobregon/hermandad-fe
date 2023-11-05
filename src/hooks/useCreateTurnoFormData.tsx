import { useCallback } from 'react'
import { createTurnoMutation } from '../apollo-graphql/mutations/TurnoAddMutation'
import { type TurnoForm } from '../types/TurnoType'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useCreateTurnoFormData () {
  const [createTurno] = createTurnoMutation()
  const handleTurnoFormSubmit = useCallback(async (turno: TurnoForm) => {
    const data = await createTurno({
      variables: turno
    })
    return data
  }, [])
  return {
    handleTurnoFormSubmit
  }
}
