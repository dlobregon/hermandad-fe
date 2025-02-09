import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
// import Login from './components/ui/Login'
import reportWebVitals from './reportWebVitals'
import type { FormProps } from 'antd'
import { Button, Form, Input } from 'antd'

interface FieldType {
  username?: string
  password?: string
}

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo)
}

const mockLogin = (username: string, password: string): boolean => {
  if (username === 'admin' && password === 'Admin!123Silencio') {
    localStorage.setItem('auth', JSON.stringify({ login: true, userType: 'admin' }))
    return true
  } else if (username === 'colaborador' && password === 'colaborador!123') {
    localStorage.setItem('auth', JSON.stringify({ login: true, userType: 'colaborador' }))
    return true
  }
  return false
}

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  if ((values.username != null) && (values.password != null) && mockLogin(values.username, values.password)) {
    console.log('Login successful')
    window.location.reload()
  } else {
    console.log('Login failed')
  }
}

const Login: React.FC = () => (
<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <Form
        name="login"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
    >
        <Form.Item<FieldType>
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
        >
        <Input />
        </Form.Item>

        <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
        >
        <Input.Password />
        </Form.Item>

        <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
            Ingresar
        </Button>
        </Form.Item>
    </Form>
</div>

)

const auth = localStorage.getItem('auth')
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  ((auth != null) && Boolean(JSON.parse(auth).login)) ? <App /> : <><Login /><Login /></>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
