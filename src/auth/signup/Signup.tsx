// src/Signup.tsx
import React from 'react';
import {
  Layout,
  Form,
  Input,
  Button,
  Row,
  Col,
  Typography,
  DatePicker,
  Flex,
  Card,
  Divider,
} from 'antd';
import { LABELS } from './SignupConstants';
import { useForm } from 'antd/es/form/Form';
// import useSignup from 'services/hooks/useSignup';
import { SignupRequest } from 'services/apis/auth';

const { Content } = Layout;
const { Title } = Typography;

const Signup: React.FC = () => {
  // const { mutate: signup, data, isLoading } = useSignup();

  const onFinish = (values: SignupRequest) => {
    // signup(values);
  };

  const [form] = useForm();

  return (
    <Layout>
      <Content>
        <Row justify='center' className='h-screen'>
          <Col xs={24} sm={12} md={10} className='h-full  p-8'>
            <Flex align='center' justify='center' className='h-full'>
              <div className='w-full'>
                <Title level={2}>{LABELS.SIGNUP_TITLE}</Title>
                <Form
                  form={form}
                  name='signup'
                  onFinish={onFinish}
                  size='middle'
                >
                  <Card>
                    {/* Personal Details */}
                    <Divider orientation='left' plain className='mt-0'>
                      {LABELS.PERSONAL_DETAILS}
                    </Divider>
                    <Row gutter={16}>
                      <Col xs={12} sm={12}>
                        <Form.Item
                          name={['personalDetails', 'firstName']}
                          rules={[
                            {
                              required: true,
                              message: `Please enter your ${LABELS.FIRST_NAME_LABEL}!`,
                            },
                          ]}
                        >
                          <Input placeholder={LABELS.FIRST_NAME_LABEL} />
                        </Form.Item>
                      </Col>
                      <Col xs={12} sm={12}>
                        <Form.Item
                          name={['personalDetails', 'lastName']}
                          rules={[
                            {
                              required: true,
                              message: `Please enter your ${LABELS.LAST_NAME_LABEL}!`,
                            },
                          ]}
                        >
                          <Input placeholder={LABELS.LAST_NAME_LABEL} />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Form.Item
                      name={['personalDetails', 'dob']}
                      rules={[
                        {
                          required: true,
                          message: `Please select your ${LABELS.DOB_LABEL}!`,
                        },
                      ]}
                    >
                      <DatePicker
                        placeholder={LABELS.DOB_LABEL}
                        className='w-full'
                      />
                    </Form.Item>

                    <Row gutter={16}>
                      <Col xs={12} sm={12}>
                        <Form.Item
                          name={['personalDetails', 'email']}
                          rules={[
                            {
                              required: true,
                              message: `Please enter your ${LABELS.EMAIL_LABEL}!`,
                            },
                          ]}
                        >
                          <Input
                            placeholder={LABELS.EMAIL_LABEL}
                            type='email'
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={12} sm={12}>
                        <Form.Item
                          name={['personalDetails', 'phoneNumber']}
                          rules={[
                            {
                              required: true,
                              message: `Please enter your ${LABELS.PHONE_NUMBER_LABEL}!`,
                            },
                          ]}
                        >
                          <Input placeholder={LABELS.PHONE_NUMBER_LABEL} />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Divider orientation='left' plain className='mt-0'>
                      {LABELS.ADDRESS_DIVIDER}
                    </Divider>

                    <Form.Item name={['personalDetails', 'address', 'street']}>
                      <Input placeholder={LABELS.STREET_LABEL} />
                    </Form.Item>

                    <Form.Item
                      name={['personalDetails', 'address', 'city']}
                      rules={[
                        {
                          required: true,
                          message: `Please enter your ${LABELS.CITY_LABEL}!`,
                        },
                      ]}
                    >
                      <Input placeholder={LABELS.CITY_LABEL} />
                    </Form.Item>

                    <Form.Item
                      name={['personalDetails', 'address', 'state']}
                      rules={[
                        {
                          required: true,
                          message: `Please enter your ${LABELS.STATE_LABEL}!`,
                        },
                      ]}
                    >
                      <Input placeholder={LABELS.STATE_LABEL} />
                    </Form.Item>

                    <Form.Item
                      name={['personalDetails', 'address', 'zipCode']}
                      rules={[
                        {
                          required: true,
                          message: `Please enter your ${LABELS.ZIP_CODE_LABEL}!`,
                        },
                      ]}
                    >
                      <Input placeholder={LABELS.ZIP_CODE_LABEL} />
                    </Form.Item>

                    <Divider orientation='left' plain>
                      {LABELS.CREDENTIALS}
                    </Divider>
                    {/* Username and Password */}
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

                    {/* Other fields and actions */}

                    <Form.Item>
                      <Button
                        type='primary'
                        htmlType='submit'
                        style={{ width: '100%' }}
                        // disabled={isLoading}
                      >
                        {LABELS.SIGNUP_BUTTON}
                      </Button>
                    </Form.Item>
                  </Card>
                </Form>
              </div>
            </Flex>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Signup;
