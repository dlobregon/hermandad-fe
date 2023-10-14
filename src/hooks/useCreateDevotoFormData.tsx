import { useCallback } from 'react'
import { createDevotoMutation } from '../apollo-graphql/mutations/DevotoAddMutation'
import { type DevotoType } from '../types/DevotoType'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useCreateDevotoFormData () {
  const [createDevoto] = createDevotoMutation()
  const handleDevotoFormSubmit = useCallback(async (devoto: DevotoType) => {
    const data = await createDevoto({
      variables: devoto
    })
    return data
  }, [])
  return {
    handleDevotoFormSubmit
  }
}
