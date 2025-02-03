export interface ReporteTurno {
  dpi: number
  nombres: string
  apellidos: string
  nombre_procesion: string
  cantidad: number
  fecha: string
  nombre_turno: string
  recibo: number
}

export interface TurnoForm {
  numero: number
  recibo: number
  procesion: number
  fecha: string
  tipo_turno: number
  usuario: number
  devoto: number | undefined
  cantidad: number
  extraordinario?: boolean
}

export interface Turno {
  turno: number
  numero: number
  recibo: number
  fecha: string
  tipo_turno: number
  usuario: number
  devoto: number
  procesion: number
}

export interface TurnosDisponibles {
  tipo_turno: number
  nombre: string
  disponibles: number
  extraordinario?: boolean
}

export interface TieneExtraordinario {
  tipo_turno: number
  tiene_extraordinario: boolean
  devoto: number
  ya_cuenta_extraordinario: boolean
  en_lista_espera: boolean
  devoto_extraordinario: number
}

export interface CortejoExtraordinario {
  procesion: number
  tipo_turno: number
  devoto: number
  devoto_extraordinario: number
  fecha: string
  consesion?: string
  comentario?: string
  recibo?: string
}

export interface DevotoExtraordinarioEspera {
  tipo_turno: number
  tipo_procesion: number
  devoto: number
}
