import React, { useState, useEffect } from 'react'
import { Button, Form, Input, Radio, InputNumber, Result, Select, DatePicker, Divider, Typography, Alert } from 'antd'
import { type DevotoType, type DevotoFormProps } from '../../types/DevotoType'
import { type TurnoForm, type TurnosDisponibles } from '../../types/TurnoType'
import type { RadioChangeEvent } from 'antd'
import dayjs from 'dayjs'
import { useCreateDevotoFormData } from '../../hooks/useCreateDevotoFormData'
import { useEditDevotoFormData } from '../../hooks/useEditDevotoFormData'
import { useCreateTurnoFormData } from '../../hooks/useCreateTurnoFormData'
import { getProcesionesQuery } from '../../apollo-graphql/queries/ProcesionesHabilitadasQ.tsx'
import { useDisponiblesByProcesion } from '../../hooks/useTurnosDisopnibles'
import { useCheckDevotoExtraordinario } from '../../hooks/useCheckDevotoExtraordinario'
import { useGuardarExtraordinarioProcesion } from '../../hooks/useGuardarExtraordinarioProcesion'
import { useGuardarDevotoListaEspera } from '../../hooks/useGuardarDevotoListaEspera'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const draftData = {
  usuario: 2,
  tipo_turno: 1,
  numero: 1
}

const FormView: React.FC<DevotoFormProps> = (formProps: DevotoFormProps) => {
  const { devotoData, isEdition, isTurno } = formProps
  const [sexo, setSexo] = useState(1)
  const { handleDevotoFormSubmit } = useCreateDevotoFormData()
  const { handleDevotoEditFormSubmit } = useEditDevotoFormData()
  const { handleTurnoFormSubmit } = useCreateTurnoFormData()
  const [submitStatus, setSubmitStatus] = useState(0)
  const [formData, setFormData] = useState(devotoData)
  const [turnoSubmit, setTurnoSubmit] = useState(0)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [disableTurnos, setDisableTurnos] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [turnosDisponibles, setTurnosDisponibles] = useState<TurnosDisponibles []>([])
  const { handleDisponiblesByProcesion } = useDisponiblesByProcesion()
  const { handleCheckDevotoExtraordinario } = useCheckDevotoExtraordinario()
  const { handleGuardarExtraordinarioProcesion } = useGuardarExtraordinarioProcesion()
  const { handleGuardarDevotoListaEspera } = useGuardarDevotoListaEspera()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedTurno, setSelectedTurno] = useState<null | string>()
  const [isCurrentExtraordinario, setCurrentExtraordinario] = useState(false)
  const [puedeTenerExtraoridnario, setPuedeTenerExtraordinario] = useState(false)
  const [currentProcesion, setCurrentProcesion] = useState(0)
  const [mensajeExtraordinario, setMesajeExtraordinario] = useState('')
  const [sePuedeInscribirExtra, setSepuedeInscribirExtra] = useState(true)
  const [devotoExtraordinario, setDevotoExtraordinario] = useState(0)
  const [savingMethod, setSavingMethod] = useState(0) // 0 = turno normal, 1- extraordinario,  2- lista de espera
  const changeSexo = ({ target: { value } }: RadioChangeEvent): void => {
    setSexo(value)
  }

  const onFinishFailed = (errorInfo: any): void => {
    setFormData(errorInfo?.values)
  }

  /*
  const resetForm = (): void => {
    setSubmitStatus(0)
    setFormData(devotoData)
  }
  */

  const onFinishHandle = (data: any): void => {
    setFormData(data)
    let result
    if (isEdition || (devotoData.devoto != null)) {
      const editData = { ...data, devoto: devotoData.devoto }
      result = handleDevotoEditFormSubmit(editData)
    } else {
      result = handleDevotoFormSubmit(data)
    }
    void result.then((data) => {
      setSubmitStatus(1)
    }).catch((e) => {
      setSubmitStatus(2)
    })
  }

  const handleProcesiones = (value: string): void => {
    const [procesionTmp, tipoProcesionTmp] = value.split(',')
    setCurrentProcesion(parseInt(procesionTmp))
    setSelectedTurno(undefined)
    const disponiblesData = handleDisponiblesByProcesion({
      procesion: parseInt(procesionTmp),
      tipo_procesion: parseInt(tipoProcesionTmp)
    })
    void disponiblesData.then((data) => {
      if ((data.data?.disponiblesByProcesion) != null) {
        setTurnosDisponibles(data.data?.disponiblesByProcesion.filter(item => item.disponibles > 0))
        setDisableTurnos(true)
        setSelectedTurno(undefined)
      }
    })
  }

  const handleSelectTurno = (value: string): void => {
    const tipoTurno = turnosDisponibles.find(item => item.tipo_turno === parseInt(value))
    setCurrentExtraordinario(tipoTurno?.extraordinario ?? false)
    setDisableTurnos(false)
    setSelectedTurno(value)
  }

  useEffect(() => {
    if (isCurrentExtraordinario) {
      const checkDevotoExtraordinarioData = handleCheckDevotoExtraordinario({
        devoto: parseInt(devotoData.devoto?.toString() ?? ''),
        tipo_turno: parseInt(selectedTurno ?? ''),
        procesion: currentProcesion
      })
      void checkDevotoExtraordinarioData.then((data) => {
        console.log(data)
        setPuedeTenerExtraordinario(data.data?.checkDevotoExtraordinario?.tiene_extraordinario ?? false)
        setDevotoExtraordinario(data.data?.checkDevotoExtraordinario?.devoto_extraordinario ?? 0)
        const extraordinarioData = data.data?.checkDevotoExtraordinario
        if (extraordinarioData != null) {
          const {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            en_lista_espera,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            ya_cuenta_extraordinario,
            // eslint-disable-next-line @typescript-eslint/naming-convention
            tiene_extraordinario
          } = extraordinarioData

          if (tiene_extraordinario) {
            // eslint-disable-next-line
            if (ya_cuenta_extraordinario) {
              setMesajeExtraordinario('El devoto ya esta inscrito')
              // eslint-disable-next-line
              setSepuedeInscribirExtra(false)
            } else {
              setMesajeExtraordinario('El devoto se puede inscribir')
              setSepuedeInscribirExtra(true)
              setSavingMethod(1)
            }
          } else {
            // eslint-disable-next-line
            if (en_lista_espera) {
              setMesajeExtraordinario('El devoto ya esta en lista de espera')
              // eslint-disable-next-line
              setSepuedeInscribirExtra(false)
            } else {
              setMesajeExtraordinario('El devoto se puede poner en lista de espera')
              setSepuedeInscribirExtra(true)
              setSavingMethod(2)
            }
          }
        }
      }).catch((e) => {
        console.log(e)
      })
    }
  }, [isCurrentExtraordinario, selectedTurno])

  const onFinishturno = (data: any): void => {
    const { devoto } = devotoData
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { recibo, fecha, procesion, cantidad, tipo_turno } = data
    const reciboNum = parseInt(recibo)
    const { usuario, numero } = draftData
    const fechaStr = dayjs(fecha).format('YYYY-MM-DD')
    const procesionTmp = parseInt(procesion)
    const turnoFormData = {
      numero,
      recibo: reciboNum,
      fecha: fechaStr,
      tipo_turno,
      usuario,
      devoto: (devoto != null) ? +devoto : 0,
      procesion: procesionTmp,
      cantidad
    }
    if (savingMethod === 0) {
      const resultTurno = handleTurnoFormSubmit(turnoFormData)
      void resultTurno.then((tdata) => {
        setTurnoSubmit(1)
      }).catch(e => {
        console.log(e)
        setTurnoSubmit(2)
      })
    } else if (savingMethod === 1) {
      const resultExtraordinario = handleGuardarExtraordinarioProcesion({
        procesion: procesionTmp,
        tipo_turno,
        devoto: (devoto != null) ? +devoto : 0,
        devoto_extraordinario: devotoExtraordinario,
        fecha: fechaStr,
        recibo
      })
      void resultExtraordinario.then((edata) => {
        console.log(edata)
        setTurnoSubmit(1)
      }).catch(e => {
        console.log(e)
        setTurnoSubmit(2)
      })
    } else if (savingMethod === 2) {
      const resultListaEspera = handleGuardarDevotoListaEspera({
        tipo_turno,
        tipo_procesion: 2,
        devoto: (devoto != null) ? +devoto : 0
      })
      void resultListaEspera.then((ldata) => {
        console.log(ldata)
        setTurnoSubmit(1)
      }).catch(e => {
        console.log(e)
        setTurnoSubmit(2)
      })
    }
  }
  // eslint-disable-next-line no-extra-boolean-cast
  if (!Boolean(isTurno)) {
    return (
    <>
      {submitStatus === 0
        ? <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 1000 }}
            initialValues={formData}
            onFinish={onFinishHandle}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<DevotoType>
              label="DPI"
              name="dpi"
              rules={[{ required: true, message: 'Por favor ingrese el número de DPI' }]}
            >
              <InputNumber stringMode={false} style={{ width: '50%' }}/>
            </Form.Item>

            <Form.Item<DevotoType>
              label="Nombre"
              name="nombres"
              rules={[{ required: true, message: 'Por favor ingrese los nombres' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<DevotoType>
              label="Apellido"
              name="apellidos"
              rules={[{ required: true, message: 'Por favor ingrese los apellidos' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
            label="Sexo"
            name="sexo"
            rules={[{ required: true, message: 'Por favor seleccione el sexo' }]}
            >
              <Radio.Group onChange={changeSexo} value={sexo} buttonStyle="solid">
                <Radio.Button value={1}>Mujer</Radio.Button>
                <Radio.Button value={2}>Hombre</Radio.Button>
              </Radio.Group>
            </Form.Item>

            <Form.Item<DevotoType>
              label="Teléfono"
              name="telefono"
            >
              <Input />
            </Form.Item>

            <Form.Item<DevotoType>
              name="email"
              label="correo"
              rules={[{ type: 'email', message: 'Por favor ingrese un correo válido!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<DevotoType>
              label="Altura"
              name="altura"
            >
              <InputNumber
              name='altura'
              style={{ width: 200 }}
              min={0.1}
              max={10.0}
              step={0.01}
              />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Guardar devoto
              </Button>
            </Form.Item>
          </Form>
        : submitStatus === 1
          ? <Result
              status="success"
              title="Los datos del devoto se han guardado exitosamente"
            />
          : <Result
              status="error"
              title="Error al guardar los datos del devoto"
              extra={[
                <Button key="buy" onClick={() => { setSubmitStatus(0) }}>Reintentar</Button>
              ]}
            />
      }
    </>
    )
  } else {
    const { data } = getProcesionesQuery()
    const { Text } = Typography
    return (
      <>
      {
        turnoSubmit === 0
          ? <Form
              name='turno'
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 1000 }}
              onFinish={onFinishturno}
              initialValues={ { cantidad: 1, fecha: dayjs(new Date()), tipo_turno: undefined }}
              autoComplete="off"
              >
                <Form.Item
                label='Nombre'
                >
                  <Text>{devotoData.nombres} {devotoData.apellidos}</Text>
                </Form.Item>
                <Divider />
              <Form.Item<TurnoForm>
                name='procesion'
                label="Seleccionar cortejo"
                rules={[{ required: true, message: 'Seleccione un cortejo' }]}
              >
                <Select style={{ width: 240 }}
                  placeholder='seleccione un cortejo procesional'
                  disabled={data === null}
                  options={data?.procesionesHabilitadas.map((procesion) => ({
                    value: `${procesion.procesion},${procesion.tipo_procesion}`,
                    label: procesion.nombre
                  }))}
                  onChange={handleProcesiones}
                />
              </Form.Item>
              <Form.Item<TurnoForm>
                name='fecha'
               label="Fecha Inscripcion"
               rules={[{ required: true, message: 'Por favor seleccione una fecha' }]}
               >
                <DatePicker placeholder='seleccionar'/>
              </Form.Item>
              <Form.Item<TurnoForm>
                name='tipo_turno'
                label="Tipo turno"
                rules={[{ required: true, message: 'Por favor seleccione un turno' }]}
                >
                <Select
                value={selectedTurno}
                options={turnosDisponibles.map((turno) => ({
                  value: turno.tipo_turno,
                  label: `${turno.nombre} - disponibles: ${turno.disponibles}`
                }))}
                onChange={handleSelectTurno}
                />
              </Form.Item>
              { isCurrentExtraordinario && selectedTurno != null &&
                <Form.Item<TurnoForm>
                  label="Informacion extraordinario"
                  name="extraordinario"
                  >
                    { puedeTenerExtraoridnario
                      ? <Alert message={'El devoto cuenta con el turno extraordinario seleccionado - ' + (mensajeExtraordinario === '' ? '' : mensajeExtraordinario) } type="success" />
                      : <Alert message={'El devoto no posee el turno extraordinario  - ' + (mensajeExtraordinario === '' ? 'escribir en lista de espera' : mensajeExtraordinario) } type="warning" />
                    }

                </Form.Item>
              }
              <Form.Item<TurnoForm>
                label="Recibo No."
                name="recibo"
                rules={[{ required: true, message: 'Por favor ingrese un número de recibo' }]}
              >
                <Input placeholder="Ingresar numero de recibo" />
              </Form.Item>
              <Form.Item<TurnoForm>
                label="Cantidad de turnos"
                name="cantidad"
                rules={[{ required: true, message: 'Por favor ingrese la cantidad de turnos' }]}
              >
                <InputNumber disabled={isCurrentExtraordinario && selectedTurno != null}/>
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type="primary" htmlType="submit" disabled={!sePuedeInscribirExtra}>
                    Guardar turno
                  </Button>
              </Form.Item>
            </Form>
          : turnoSubmit === 1
            ? <Result
              status="success"
              title="Los datos del turno se han guardado con Exito"
              />
            : <Result
                status="error"
                 title="Los datos no han sido ingresados, intente de nuevo"
              />

      }

      </>
    )
  }
}

export default FormView
