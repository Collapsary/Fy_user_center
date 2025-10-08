import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {Alert, Divider, message, Space, Tabs} from 'antd';
import React, {useState} from 'react';
import {ProFormCheckbox, ProFormText, LoginForm} from '@ant-design/pro-form';
import {history, useModel} from 'umi';
import {PLANET_LINK, SYSTEM_LOGO} from '@/constants';
import Footer from '@/components/Footer';
import {login} from '@/services/ant-design-pro/api';
import styles from './index.less';
import {Link} from "@umijs/preset-dumi/lib/theme";

const LoginMessage: React.FC<{
  content: string;
}> = ({content}) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login: React.FC = () => {
  const [userLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('account');
  const {initialState, setInitialState} = useModel('@@initialState');

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();

    if (userInfo) {
      await setInitialState((s) => ({...s, currentUser: userInfo}));
    }
  };

  const handleSubmit = async (values: API.LoginParams) => {
    try {
      // 登录
      const response = await login({...values, type});
      console.log('登录响应:', response);

      if (response && response.code === 1 && response.data) {
        const defaultLoginSuccessMessage = '登录成功！';
        message.success(defaultLoginSuccessMessage);
        
        // 更新用户状态
        await fetchUserInfo();
        
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        const {query} = history.location;
        const {redirect} = query as {
          redirect: string;
        };
        history.push(redirect || '/admin');
        return;
      } else {
        // 登录失败
        const errorMessage = response?.msg || '登录失败，请检查账号密码！';
        message.error(errorMessage);
        console.error('登录失败:', response);
      }
    } catch (error: any) {
      console.error('登录异常:', error);
      const defaultLoginFailureMessage = error?.message || '登录失败，请重试！';
      message.error(defaultLoginFailureMessage);
    }
  };

  const {status, type: loginType} = userLoginState;
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          logo={<img alt="logo" src={SYSTEM_LOGO}/>}
          title="用户管理中心"
          subTitle={<a href={PLANET_LINK} target="_blank" rel="noreferrer">实现简单的用户管理</a>}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
        >
          <Tabs activeKey={type} onChange={setType}>
            <Tabs.TabPane key="account" tab={'账号密码登录'}/>
          </Tabs>
          {status === 'error' && loginType === 'account' && (
            <LoginMessage content={'错误的账号和密码'}/>
          )}
          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon}/>,
                }}
                placeholder="请输入账号"
                rules={[
                  {
                    required: true,
                    message: '账号是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon}/>,
                }}
                placeholder="请输入密码"
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                  {
                    min: 8,
                    type: 'string',
                    message: '长度不能小于 8',
                  },
                ]}
              />
            </>
          )}
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <div style={{ marginBottom: 16 }}>
              <ProFormCheckbox noStyle name="autoLogin">
                自动登录
              </ProFormCheckbox>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Space size="large">
                <Link to="/user/register">新用户注册</Link>
                <Link to="/user/forget-password">忘记密码</Link>
              </Space>
            </div>
          </div>
        </LoginForm>
      </div>
      <Footer/>
    </div>
  );
};

export default Login;
