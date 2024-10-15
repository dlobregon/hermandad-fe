import { type Dayjs } from 'dayjs'
export interface ProcesionType {
  procesion: number
  nombre: string
  fecha: string
  comentario: string
  habilitado: boolean
  tipo_procesion: number
  sexo: number
  brazos: number
  total_turnos: number
}

export interface ProcesionFormType {
  procesion: number | undefined
  nombre: string | undefined
  fecha: string | undefined | Dayjs
  comentario: string | undefined
  habilitado: boolean | undefined
  tipo_procesion: number | undefined
  sexo: number | undefined
  brazos: number | undefined
  total_turnos: number | undefined
}
