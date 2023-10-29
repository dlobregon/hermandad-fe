import { useCallback } from 'react'
import { editDevotoMutation } from '../apollo-graphql/mutations/DevotoEditMutation'
import { type DevotoType } from '../types/DevotoType'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useEditDevotoFormData () {
  const [editDevoto] = editDevotoMutation()
  const handleDevotoEditFormSubmit = useCallback(async (devoto: DevotoType) => {
    const data = await editDevoto({
      variables: devoto
    })
    return data
  }, [])
  return {
    handleDevotoEditFormSubmit
  }
}
