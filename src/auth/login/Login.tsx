// src/Login.tsx
import React from 'react';
import {
  Layout,
  Form,
  Input,
  Button,
  Checkbox,
  Row,
  Col,
  Typography,
  Flex,
} from 'antd';
import { LABELS } from './LoginConstants';
import { useForm } from 'antd/es/form/Form';
import useLogin from 'services/hooks/useLogin';
import { LoginRequest } from 'services/apis/auth';

const { Content } = Layout;
const { Title } = Typography;

const Login: React.FC = () => {
  const { mutate: login, data, isLoading } = useLogin();

  const onFinish = (values: LoginRequest) => {
    login(values);
  };

  const [form] = useForm();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout className='bg-gray-700'>
        <Content>
          <Row justify='start' align='middle' style={{ minHeight: '100vh' }}>
            <Col
              xs={12}
              sm={12}
              md={8}
              lg={6}
              className='p-8 bg-white h-screen'
            >
              <Flex align='center' justify='center' className='h-full'>
                <div className='w-full'>
                  <Title level={2}>{LABELS.LOGIN_TITLE}</Title>
                  <Form
                    form={form}
                    name='login'
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    size='large'
                  >
                    <Form.Item
                      name='username'
                      rules={[
                        {
                          required: true,
                          message: `Please enter your ${LABELS.USERNAME_LABEL}!`,
                        },
                      ]}
                    >
                      <Input placeholder={LABELS.USERNAME_LABEL} />
                    </Form.Item>

                    <Form.Item
                      name='password'
                      rules={[
                        {
                          required: true,
                          message: `Please enter your ${LABELS.PASSWORD_LABEL}!`,
                        },
                      ]}
                    >
                      <Input.Password placeholder={LABELS.PASSWORD_LABEL} />
                    </Form.Item>

                    <Form.Item>
                      <Form.Item
                        name='remember'
                        valuePropName='checked'
                        noStyle
                      >
                        <Checkbox>{LABELS.REMEMBER_ME_LABEL}</Checkbox>
                      </Form.Item>

                      <a href='#forgot-password' style={{ float: 'right' }}>
                        {LABELS.FORGOT_PASSWORD_LINK}
                      </a>
                    </Form.Item>

                    <Form.Item>
                      <Button
                        type='primary'
                        htmlType='submit'
                        style={{ width: '100%' }}
                        disabled={isLoading}
                      >
                        {LABELS.LOGIN_BUTTON}
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </Flex>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Login;
