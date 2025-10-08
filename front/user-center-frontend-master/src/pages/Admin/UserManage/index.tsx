import React, { useRef, useEffect, useState } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { searchUsers, currentUser, adminUpdateUser, deleteUser } from "@/services/ant-design-pro/api";
import { Image, Tag, Avatar, Space, Button, message, Card, Result } from "antd";
import { UserOutlined, EditOutlined, DeleteOutlined, EyeOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

// 动态生成列定义
const getColumns = (isAdmin: boolean, currentUserId: number): ProColumns<API.CurrentUser>[] => [
  {
    dataIndex: 'id',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '用户信息',
    dataIndex: 'username',
    render: (_, record) => (
      <Space>
        <Avatar 
          src={record.avatarUrl} 
          icon={<UserOutlined />}
          size={40}
        />
        <div>
          <div style={{ fontWeight: 'bold' }}>{record.username}</div>
          <div style={{ color: '#666', fontSize: '12px' }}>{record.userAccount}</div>
        </div>
      </Space>
    ),
    copyable: true,
    editable: (text, record) => isAdmin || record.id === currentUserId, // 管理员或用户自己可以编辑
  },
  {
    title: '性别',
    dataIndex: 'gender',
    render: (_, record) => {
      if (record.gender === null || record.gender === undefined) {
        return (
          <Tag color="default">
            待用户设置
          </Tag>
        );
      }
      return (
        <Tag color={record.gender === 1 ? 'blue' : 'pink'}>
          {record.gender === 1 ? '男' : '女'}
        </Tag>
      );
    },
    editable: (text, record) => isAdmin || record.id === currentUserId, // 管理员或用户自己可以编辑
  },
  {
    title: '联系方式',
    dataIndex: 'phone',
    render: (_, record) => (
      <div>
        <div>{record.phone}</div>
        <div style={{ color: '#666', fontSize: '12px' }}>{record.email}</div>
      </div>
    ),
    copyable: true,
    editable: (text, record) => isAdmin || record.id === currentUserId, // 管理员或用户自己可以编辑
  },
  {
    title: '状态',
    dataIndex: 'userStatus',
    render: (_, record) => (
      <Tag color={record.userStatus === 0 ? 'green' : 'red'}>
        {record.userStatus === 0 ? '正常' : '禁用'}
      </Tag>
    ),
  },
  {
    title: '编号',
    dataIndex: 'planetCode',
    copyable: true,
    editable: false, // 编号不可编辑
  },
  {
    title: '角色',
    dataIndex: 'userRole',
    render: (_, record) => (
      <Tag color={record.userRole === 1 ? 'gold' : 'default'}>
        {record.userRole === 1 ? '管理员' : '普通用户'}
      </Tag>
    ),
    editable: isAdmin, // 只有管理员可以编辑角色
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    valueType: 'dateTime',
    sorter: true,
  },
  {
    title: '操作',
    valueType: 'option',
    render: (text, record, _, action) => {
      const isCurrentUser = record.id === currentUserId;
      const canEdit = isAdmin || isCurrentUser;
      const canDelete = isAdmin || isCurrentUser;
      
      const operations = [];
      
      // 查看按钮 - 所有用户都可以查看
      operations.push(
        <Button
          key="view"
          type="link"
          icon={<EyeOutlined />}
          onClick={() => {
            message.info('查看用户详情功能待开发');
          }}
        >
          查看
        </Button>
      );
      
      // 编辑按钮 - 管理员可以编辑所有用户，普通用户只能编辑自己
      if (canEdit) {
        operations.push(
          <Button
            key="edit"
            type="link"
            icon={<EditOutlined />}
            onClick={() => {
              action?.startEditable?.(record.id);
            }}
          >
            编辑
          </Button>
        );
      }
      
      // 删除按钮 - 管理员可以删除所有用户，普通用户只能删除自己
      if (canDelete) {
        operations.push(
          <Button
            key="delete"
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={async () => {
              try {
                const response = await deleteUser(record.id);
                if (response && response.code === 1) {
                  message.success('删除成功');
                  actionRef.current?.reload();
                } else {
                  message.error(response?.msg || '删除失败，请重试！');
                }
              } catch (error: any) {
                console.error('删除用户失败:', error);
                message.error(error?.message || '删除失败，请重试！');
              }
            }}
          >
            删除
          </Button>
        );
      }
      
      return operations;
    },
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [currentUserId, setCurrentUserId] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  // 检查用户权限
  useEffect(() => {
    const checkUserRole = async () => {
      try {
        const response = await currentUser();
        console.log('用户信息响应:', response);
        if (response && response.code === 1 && response.data) {
          console.log('用户角色:', response.data.userRole);
          const isAdminUser = response.data.userRole === 1;
          console.log('是否为管理员:', isAdminUser);
          setIsAdmin(isAdminUser);
          setCurrentUserId(response.data.id);
        } else {
          console.log('用户信息获取失败:', response);
          setIsAdmin(false);
        }
      } catch (error) {
        console.error('获取用户信息失败:', error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };
    checkUserRole();
  }, []);

  // 加载中状态
  if (loading) {
    return <div>加载中...</div>;
  }

  return (
    <ProTable<API.CurrentUser>
      columns={getColumns(isAdmin, currentUserId)}
      actionRef={actionRef}
      cardBordered
      request={async (params = {}, sort, filter) => {
        console.log(sort, filter);
        try {
          const response = await searchUsers();
          return {
            data: response.data || [],
            success: true,
            total: response.data?.length || 0,
          }
        } catch (error) {
          console.error('获取用户列表失败:', error);
          message.error('获取用户列表失败，请检查权限');
          return {
            data: [],
            success: false,
            total: 0,
          }
        }
      }}
      editable={{
        type: 'multiple',
        onSave: async (key, row) => {
          try {
            console.log('保存用户信息:', row);
            
            if (isAdmin) {
              // 管理员只能修改用户角色
              const response = await adminUpdateUser({
                id: row.id,
                userRole: row.userRole,
              });
              
              if (response && response.code === 1) {
                message.success('保存成功');
                actionRef.current?.reload();
              } else {
                message.error(response?.msg || '保存失败，请重试！');
              }
            } else {
              // 普通用户只能修改自己的基本信息
              const response = await adminUpdateUser({
                id: row.id,
                username: row.username,
                avatarUrl: row.avatarUrl,
                gender: row.gender,
                phone: row.phone,
                email: row.email,
                // 注意：普通用户不能修改planetCode和userRole
              });
              
              if (response && response.code === 1) {
                message.success('保存成功');
                actionRef.current?.reload();
              } else {
                message.error(response?.msg || '保存失败，请重试！');
              }
            }
          } catch (error: any) {
            console.error('保存用户信息失败:', error);
            message.error(error?.message || '保存失败，请重试！');
          }
        },
      }}
      columnsState={{
        persistenceKey: 'user-manage-table',
        persistenceType: 'localStorage',
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
        defaultCollapsed: false,
        optionRender: ({ searchText, resetText }, { form }) => [
          <Button
            key="search"
            type="primary"
            onClick={() => {
              form?.submit();
            }}
          >
            {searchText}
          </Button>,
          <Button
            key="reset"
            onClick={() => {
              form?.resetFields();
            }}
          >
            {resetText}
          </Button>,
        ],
      }}
      form={{
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条/总共 ${total} 条`,
      }}
      dateFormatter="string"
      headerTitle="用户管理"
      toolBarRender={() => [
        <Button key="refresh" onClick={() => actionRef.current?.reload()}>
          刷新
        </Button>,
      ]}
      options={{
        setting: {
          listsHeight: 400,
        },
      }}
    />
  );
};
