import { Button, Col, Form, Input, Row, message } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export const Register = () => {
    const auth = useAuth()
    const navigate = useNavigate()

    async function onFinish(values: {
        name: string
        email: string
        password: string
    }) {
        try {
            await auth.register(values.name, values.email, values.password)

            navigate('/')
        } catch (error: any) {
            message.error(error?.message || 'Something went wrong')
        }
    }

    return (
        <Row
            justify="center"
            align="middle"
            style={{
                height: '100vh',
            }}
        >
            <Col span={12}>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    onFinish={onFinish}
                >
                    <Form.Item label="Name" name="name">
                        <Input />
                    </Form.Item>

                    <Form.Item label="Email" name="email">
                        <Input />
                    </Form.Item>

                    <Form.Item label="Password" name="password">
                        <Input.Password />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Register
                        </Button>

                        <Button
                            type="link"
                            onClick={() => {
                                navigate('/login')
                            }}
                        >
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    )
}
