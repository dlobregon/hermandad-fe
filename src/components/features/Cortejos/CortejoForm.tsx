import React from 'react'
import { Button, Form, Input, Radio, InputNumber, Select, DatePicker } from 'antd'
import { type ProcesionType, type ProcesionFormType } from '../../../types/ProcesionType'
/**
 * campos a llenar:
 * - Nombre
 * - fecha
 * - comentario
 * - incripcion: (abierta/cerrada)
 * - recorrido/tipo_cortejo: (este viene cargado de tipo_procesion)
 * - Imagen
 * - Total turnos
 * - Numero de brazos
 */
interface CortejoFormProps {
  currentCortejo: ProcesionFormType
}

const CortejoForm: React.FC<CortejoFormProps> = (props: CortejoFormProps) => {
  const { currentCortejo } = props
  console.log(currentCortejo)
  // const [formData, setFormData] = useState(currentCortejo)
  // console.log(formData)
  return (
        <Form
        name='cortejo'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        autoComplete='off'
        initialValues={currentCortejo}
        preserve={false}
        >
            <Form.Item<ProcesionType>
            label='Nombre'
            name='nombre'
            rules={[{ required: true, message: 'Por favor ingrese el nombre del cortejo' }]}
            >
                <Input/>
            </Form.Item>
            <Form.Item<ProcesionType>
            label='Fecha'
            name='fecha'
            rules={[{ required: true, message: 'Por favor ingrese el nombre del cortejo' }]}
            >
                <DatePicker placeholder='seleccionar'/>
            </Form.Item>
            <Form.Item<ProcesionType>
            label='Comentario'
            name='comentario'
            >
                <Input/>
            </Form.Item>
            <Form.Item
            label="Inscripción"
            name="habilitado"
            rules={[{ required: true, message: 'Seleccione una opcion' }]}
            >
              <Radio.Group buttonStyle="solid">
                <Radio.Button value={true}>Abierta</Radio.Button>
                <Radio.Button value={false}>Cerrada</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item<ProcesionType>
            label='Tipo de Procesion/Recorrido'
            name='tipo_procesion'
            >
                <Select style={{ width: 240 }}
                  placeholder='seleccione un tipo de cortejo procesional'
                  disabled={false}
                  options={[
                    {
                      value: 1,
                      label: 'Jueves Santo'
                    },
                    {
                      value: 2,
                      label: 'Sabado del silencio'
                    }
                  ]}
                />
            </Form.Item>
            <Form.Item
            label="Sexo"
            name="sexo"
            rules={[{ required: true, message: 'Seleccione una opcion' }]}
            >
              <Radio.Group buttonStyle="solid">
                <Radio.Button value={1}>Caballeros</Radio.Button>
                <Radio.Button value={2}>Damas</Radio.Button>
                <Radio.Button value={3}>Mixto</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item<ProcesionType>
            label='Total de turnos'
            name='total_turnos'
            >
                <InputNumber />
            </Form.Item>
            <Form.Item<ProcesionType>
            label='Número de brazos del anda'
            name='brazos'
            >
                <InputNumber />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                Guardar cortejo
                </Button>
            </Form.Item>
        </Form>
  )
}

export default CortejoForm
