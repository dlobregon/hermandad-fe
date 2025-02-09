// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState, useEffect, useCallback } from 'react'
import { Divider, Space, Select, Button, Result, Typography } from 'antd'
import { getProcesionesQuery } from '../../../apollo-graphql/queries/ProcesionesHabilitadasQ.tsx'
import { useTurnoByProcesion } from '../../../hooks/useTurnosByProcesion'
import { type ReporteTurno } from '../../../types/TurnoType'
import TurnosPorProcesionView from './TurnosPorProcesionView'
import { MessageOutlined } from '@ant-design/icons'
const { Text } = Typography

const Turno: React.FC = () => {
  const [turnos, setTurnos] = useState<ReporteTurno[]>([])
  const [currentProcesion, setCurrentProcesion] = useState(0)
  const { handleTurnosByProcesion } = useTurnoByProcesion()
  const [isLoaded, setIsloaded] = useState(false)
  const [isProcesionChange, setProcesionChange] = useState(false)
  const [cantidadTurnos, setCantidadTurnos] = useState(0)

  const { data } = getProcesionesQuery()
  useEffect(() => {
    if (turnos != null) {
      const totalCantidad = turnos.reduce((acc, turno) => acc + turno.cantidad, 0)
      setCantidadTurnos(totalCantidad)
    }
  }, [turnos])
  const handleChangeProcesion = (value: string): void => {
    setCurrentProcesion(parseInt(value))
    if (parseInt(value) !== currentProcesion) {
      setProcesionChange(true)
    } else {
      setProcesionChange(false)
    }
  }

  const callGetTurnos = (): void => {
    const turnosData = handleTurnosByProcesion({ procesion: currentProcesion })
    void turnosData.then((turnosD) => {
      const returnData = (turnosD.data != null) ? turnosD.data?.turnosByProcesion : []
      setTurnos(returnData)
      setIsloaded(true)
      setProcesionChange(false)
    })
  }

  return (
    <>
        <div>
                <Space>
                    <Select style={{ width: 240 }}
                        placeholder='seleccione un cortejo procesional'
                        disabled={data === null}
                        options={data?.procesionesHabilitadas.map((procesion) => ({
                          value: procesion.procesion,
                          label: procesion.nombre
                        }))}
                        onChange={handleChangeProcesion}
                    >
                    </Select>
                    <Button type='primary' onClick={callGetTurnos} disabled={currentProcesion === 0}>
                        Obtener turnos
                    </Button>
                    <Text type='danger'>{isProcesionChange ? 'No se muestran los datos seleccionados' : ''}</Text>
                </Space>
                <p style={{ float: 'right' }}>Cantidad de Turnos: {cantidadTurnos}</p>
                <Divider />
        </div>
        {isLoaded
          ? <TurnosPorProcesionView turnosPorProcesion={turnos} />
          : <Result
                icon={<MessageOutlined color='warning'/>}
                title="Seleccione un cortejo procesional para obtener los turnos"
            />
        }

    </>
  )
}

export default Turno
