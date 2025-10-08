import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Typography, Space, Button, Row, Col, Statistic } from 'antd';
import { UserOutlined, SettingOutlined, TeamOutlined, UserAddOutlined } from '@ant-design/icons';
import { history, useModel } from 'umi';
import { currentUser } from '@/services/ant-design-pro/api';

const { Title, Paragraph } = Typography;

const Admin: React.FC = (props) => {
  const { children } = props;
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // 检查用户权限
  useEffect(() => {
    const checkUserRole = async () => {
      try {
        const response = await currentUser();
        console.log('管理页面用户信息响应:', response);
        if (response && response.code === 1 && response.data) {
          console.log('管理页面用户角色:', response.data.userRole);
          const isAdminUser = response.data.userRole === 1;
          console.log('管理页面是否为管理员:', isAdminUser);
          setIsAdmin(isAdminUser);
        } else {
          console.log('管理页面用户信息获取失败:', response);
          setIsAdmin(false);
        }
      } catch (error) {
        console.error('管理页面获取用户信息失败:', error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };
    checkUserRole();
  }, []);

  const handleGoToUserManage = () => {
    history.push('/admin/user-manage');
  };

  const handleGoToUpdate = () => {
    history.push('/user/update');
  };

  return (
    <PageContainer
      title="管理中心"
      subTitle="用户管理系统后台"
      extra={[
        <Button key="update" icon={<UserOutlined />} onClick={handleGoToUpdate}>
          修改个人信息
        </Button>,
      ]}
    >
      {!children && (
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Card>
              <Statistic
                title="系统状态"
                value="运行中"
                valueStyle={{ color: '#3f8600' }}
                prefix={<TeamOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card>
              <Statistic
                title="用户总数"
                value={0}
                prefix={<UserOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card>
              <Statistic
                title="管理员数量"
                value={isAdmin ? 1 : 0}
                prefix={<UserAddOutlined />}
              />
            </Card>
          </Col>
        </Row>
      )}
      
      {children}
    </PageContainer>
  );
};

export default Admin;
