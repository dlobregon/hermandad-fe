import React, { useState } from 'react'
import { Button, Form, Input, Radio, InputNumber, Result } from 'antd'
import { type DevotoType, type DevotoFormProps } from '../../types/DevotoType'
import type { RadioChangeEvent } from 'antd'
import { useCreateDevotoFormData } from '../../hooks/useCreateDevotoFormData'
import { useEditDevotoFormData } from '../../hooks/useEditDevotoFormData'

const FormView: React.FC<DevotoFormProps> = (formProps: DevotoFormProps) => {
  const { devotoData, isEdition } = formProps
  const [sexo, setSexo] = useState(1)
  const { handleDevotoFormSubmit } = useCreateDevotoFormData()
  const { handleDevotoEditFormSubmit } = useEditDevotoFormData()
  const [submitStatus, setSubmitStatus] = useState(0)
  const [formData, setFormData] = useState(devotoData)

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
}

export default FormView
