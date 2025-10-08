import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  IdcardOutlined,
  ManOutlined,
  WomanOutlined,
} from '@ant-design/icons';
import { Button, Form, Input, message, Radio, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { history, useModel } from 'umi';
import { SYSTEM_LOGO } from '@/constants';
import Footer from '@/components/Footer';
import { currentUser, updateUser } from '@/services/ant-design-pro/api';
import styles from './index.less';

const Update: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<API.CurrentUser | null>(null);
  const { initialState, setInitialState } = useModel('@@initialState');

  // 获取当前用户信息
  const fetchUserInfo = async () => {
    try {
      const response = await currentUser();
      if (response && response.data) {
        setUserInfo(response.data);
        // 设置表单初始值
        form.setFieldsValue({
          username: response.data.username,
          avatarUrl: response.data.avatarUrl,
          gender: response.data.gender,
          phone: response.data.phone,
          email: response.data.email,
          planetCode: response.data.planetCode,
        });
      } else {
        message.error('请先登录');
        history.push('/user/login');
      }
    } catch (error) {
      message.error('获取用户信息失败，请先登录');
      history.push('/user/login');
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  // 表单提交
  const handleSubmit = async (values: API.UpdateUserParams) => {
    setLoading(true);
    try {
      const response = await updateUser(values);
      if (response && response.data) {
        message.success('修改成功！');
        // 更新全局用户信息
        await initialState?.fetchUserInfo?.();
        // 跳转到首页
        history.push('/admin');
      } else {
        message.error('修改失败，请重试！');
      }
    } catch (error: any) {
      message.error(error.message || '修改失败，请重试！');
    } finally {
      setLoading(false);
    }
  };

  // 返回首页
  const handleBack = () => {
    history.push('/admin');
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.updateForm}>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <img alt="logo" src={SYSTEM_LOGO} style={{ height: 40, marginBottom: 16 }} />
            <h2 style={{ margin: 0, color: '#333' }}>修改个人信息</h2>
          </div>

          <Form
            form={form}
            name="update"
            onFinish={handleSubmit}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              name="username"
              label="用户昵称"
              rules={[
                { required: true, message: '请输入用户昵称！' },
                { min: 2, message: '昵称至少2个字符！' },
                { max: 20, message: '昵称最多20个字符！' },
              ]}
            >
              <Input
                size="large"
                prefix={<UserOutlined className={styles.prefixIcon} />}
                placeholder="请输入用户昵称"
              />
            </Form.Item>

            <Form.Item
              name="avatarUrl"
              label="头像链接"
              rules={[
                { type: 'url', message: '请输入有效的URL地址！' },
              ]}
            >
              <Input
                size="large"
                prefix={<UserOutlined className={styles.prefixIcon} />}
                placeholder="请输入头像链接"
              />
            </Form.Item>

            <Form.Item
              name="gender"
              label="性别"
              rules={[{ required: true, message: '请选择性别！' }]}
            >
              <Radio.Group size="large">
                <Space direction="vertical">
                  <Radio value={0}>
                    <WomanOutlined style={{ color: '#ff69b4', marginRight: 8 }} />
                    女
                  </Radio>
                  <Radio value={1}>
                    <ManOutlined style={{ color: '#1890ff', marginRight: 8 }} />
                    男
                  </Radio>
                </Space>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              name="phone"
              label="电话"
              rules={[
                { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码！' },
              ]}
            >
              <Input
                size="large"
                prefix={<PhoneOutlined className={styles.prefixIcon} />}
                placeholder="请输入手机号码"
              />
            </Form.Item>

            <Form.Item
              name="email"
              label="邮箱"
              rules={[
                { type: 'email', message: '请输入正确的邮箱地址！' },
              ]}
            >
              <Input
                size="large"
                prefix={<MailOutlined className={styles.prefixIcon} />}
                placeholder="请输入邮箱地址"
              />
            </Form.Item>

            <Form.Item
              name="planetCode"
              label="编号"
              rules={[
                { required: true, message: '请输入编号！' },
                { min: 1, message: '编号至少1个字符！' },
                { max: 5, message: '编号最多5个字符！' },
              ]}
            >
              <Input
                size="large"
                prefix={<IdcardOutlined className={styles.prefixIcon} />}
                placeholder="请输入编号"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={loading}
                className={styles.submitButton}
              >
                确认修改
              </Button>
            </Form.Item>

            <Form.Item>
              <Button
                size="large"
                onClick={handleBack}
                className={styles.backButton}
              >
                返回首页
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Update;
