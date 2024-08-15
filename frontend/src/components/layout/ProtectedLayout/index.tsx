import React, { useEffect, useState, useRef } from 'react';
import { Spin } from 'antd';
import { useAuth } from '../../../features/auth/hooks/useAuth';
import { Unauthorized } from '../../../features/auth/components/Unauthorized';

export const ProtectedLayout = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth();
  const [loading, setLoading] = useState(true);
  const fetchedRef = useRef(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (fetchedRef.current || auth.email) {
        return;
      }
      fetchedRef.current = true;

      try {
        await auth.getMe();
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <Spin size="large" />
      </div>
    );
  }

  if (!auth.email) {
    // TODO: Check by token
    return <Unauthorized />;
  }

  return children;
};
