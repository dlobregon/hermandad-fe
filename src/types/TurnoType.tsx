export interface ReporteTurno {
  dpi: number
  nombres: string
  apellidos: string
  nombre_procesion: string
  cantidad: number
  fecha: string
  turno_numero: number
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
}
