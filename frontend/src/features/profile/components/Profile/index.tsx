import React from 'react';
import { Button, Typography, Space, Avatar } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useAuth } from '../../../auth/hooks/useAuth';

const { Title, Text } = Typography;

export const Profile = () => {
  const auth = useAuth();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="text-center w-full max-w-md">
        <Avatar size={80} icon={<UserOutlined />} className="mb-4" />
        <Title level={2} className="mt-2 mb-4">
          {auth.name || 'User Profile'}
        </Title>
        <Space direction="vertical" size="large" className="w-full">
          <div>
            <Text strong>Email:</Text>
            <Text className="ml-2">{auth.email}</Text>
          </div>
          <div>
            <Text strong>Name:</Text>
            <Text className="ml-2">{auth.name}</Text>
          </div>
          <Button
            type="primary"
            icon={<LogoutOutlined />}
            onClick={auth.logout}
            size="large"
            className="w-full mt-4"
          >
            Logout
          </Button>
        </Space>
      </div>
    </div>
  );
};
