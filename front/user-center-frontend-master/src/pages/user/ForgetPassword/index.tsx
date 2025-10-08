import {
  UserOutlined,
  LockOutlined,
  PhoneOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { Button, Form, Input, message, Space, Divider, Alert } from 'antd';
import React, { useState } from 'react';
import { history } from 'umi';
import { SYSTEM_LOGO } from '@/constants';
import Footer from '@/components/Footer';
import { forgetPassword } from '@/services/ant-design-pro/api';
import styles from './index.less';
import { Link } from "@umijs/preset-dumi/lib/theme";

const ForgetPassword: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // 表单提交
  const handleSubmit = async (values: API.ForgetPasswordParams) => {
    const { newPassword, checkPassword } = values;
    
    // 校验两次密码是否一致
    if (newPassword !== checkPassword) {
      message.error('两次输入的密码不一致');
      return;
    }

    // 校验至少提供一个身份信息
    const { userAccount, phone, email } = values;
    if (!userAccount && !phone && !email) {
      message.error('请至少提供账号、电话或邮箱中的一个');
      return;
    }

    setLoading(true);
    try {
      const response = await forgetPassword(values);
      console.log('忘记密码响应:', response);
      if (response && response.code === 1) {
        message.success('密码重置成功！');
        // 跳转到登录页面
        history.push('/user/login');
      } else {
        message.error(response?.msg || '密码重置失败，请重试！');
      }
    } catch (error: any) {
      console.error('忘记密码错误:', error);
      message.error(error.message || '密码重置失败，请重试！');
    } finally {
      setLoading(false);
    }
  };

  // 返回登录页面
  const handleBack = () => {
    history.push('/user/login');
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.forgetForm}>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <img alt="logo" src={SYSTEM_LOGO} style={{ height: 40, marginBottom: 16 }} />
            <h2 style={{ margin: 0, color: '#333' }}>重置密码</h2>
            <p style={{ margin: '8px 0 0 0', color: '#666', fontSize: '14px' }}>
              请提供以下信息之一来重置密码
            </p>
          </div>

          <Form
            form={form}
            name="forgetPassword"
            onFinish={handleSubmit}
            autoComplete="off"
            layout="vertical"
          >
            <Alert
              message="提示"
              description="请至少填写账号、手机号或邮箱中的一项，以及新密码信息"
              type="info"
              showIcon
              style={{ marginBottom: 24 }}
            />

            <Form.Item
              name="userAccount"
              label="用户账号"
              rules={[
                { min: 4, message: '账号至少4个字符！' },
              ]}
            >
              <Input
                size="large"
                prefix={<UserOutlined className={styles.prefixIcon} />}
                placeholder="请输入用户账号"
              />
            </Form.Item>

            <Form.Item
              name="phone"
              label="手机号码"
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
              label="邮箱地址"
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

            <Divider style={{ margin: '24px 0' }} />

            <Form.Item
              name="newPassword"
              label="新密码"
              rules={[
                { required: true, message: '请输入新密码！' },
                { min: 8, message: '密码至少8个字符！' },
              ]}
            >
              <Input.Password
                size="large"
                prefix={<LockOutlined className={styles.prefixIcon} />}
                placeholder="请输入新密码（至少8位）"
              />
            </Form.Item>

            <Form.Item
              name="checkPassword"
              label="确认新密码"
              dependencies={['newPassword']}
              rules={[
                { required: true, message: '请再次输入新密码！' },
                { min: 8, message: '密码至少8个字符！' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('两次输入的密码不一致'));
                  },
                }),
              ]}
            >
              <Input.Password
                size="large"
                prefix={<LockOutlined className={styles.prefixIcon} />}
                placeholder="请再次输入新密码"
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
                重置密码
              </Button>
            </Form.Item>

            <Form.Item>
              <Button
                size="large"
                onClick={handleBack}
                className={styles.backButton}
              >
                返回登录
              </Button>
            </Form.Item>
          </Form>

          <div
            style={{
              marginTop: 24,
              textAlign: 'center',
            }}
          >
            <Space split={<Divider type="vertical" />}>
              <Link to="/user/login">返回登录</Link>
              <Link to="/user/register">新用户注册</Link>
            </Space>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ForgetPassword;
