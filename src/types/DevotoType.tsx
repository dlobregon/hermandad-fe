export interface DevotoType {
  devoto: number
  dpi: number
  nombres: string
  apellidos: string
  sexo: number
  telefono: string
  email: string
  altura: number
}

export interface DevotoFormType {
  devoto: number | undefined
  dpi: number | undefined
  nombres: string | undefined
  apellidos: string | undefined
  sexo: number | undefined
  telefono: string | undefined
  email: string | undefined
  altura: number | undefined
}

export interface DevotoFormProps {
  isEdition: boolean
  devotoData: DevotoFormType
  resetDevoto: () => void
}
