import React, { FC } from 'react';
import { Button, Flex, Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Title } = Typography;

interface LandingProps {}

const Landing: FC<LandingProps> = () => {
  return (
    <Flex
      align='center'
      justify='center'
      vertical
      className='h-screen w-screen'
    >
      <Title level={1} className='!text-5xl !text-red-700'>
        Eternal Gaming
      </Title>
      <Title level={4}>Where every click makes history</Title>
      <Flex className='mt-4' gap='1em'>
        <Link to={'/login'}>
          <Button size='large'>Login</Button>
        </Link>
        <Link to={'/signup'}>
          <Button size='large'>Signup</Button>
        </Link>
      </Flex>
    </Flex>
  );
};

export default Landing;
