import { HideInput, ProTable } from '@/components';
import { createTag, deleteTag, getTagList, updateTag } from '@/services/home';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Form, Input, Modal, Popconfirm, Space } from 'antd';
import { useRef, useState } from 'react';

const List = () => {
  const actionRef = useRef<ActionType>();
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const columns: ProColumns[] = [
    {
      title: '问题',
      dataIndex: 'title',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 200,
      render: (_, record) => (
        <Space size="small">
          <Button
            onClick={() => {
              form.setFieldsValue(record);
              setVisible(true);
            }}
            type="link"
            size="small"
          >
            编辑
          </Button>
          <Popconfirm
            title="删除"
            description="确定删除?"
            onConfirm={async () => {
              await deleteTag({ id: record.id });
              actionRef.current?.reload();
            }}
          >
            <Button danger type="link" size="small">
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const onSubmit = async () => {
    const values = await form.validateFields();
    if (values.id) {
      await updateTag(values);
    } else {
      await createTag(values);
    }
    actionRef.current?.reload();
    setVisible(false);
  };

  return (
    <PageContainer ghost>
      <ProTable
        actionRef={(el: any) => {
          actionRef.current = el;
        }}
        toolBarRender={() => [
          <Button type="primary" key="primary">
            <PlusOutlined />
            添加问题
          </Button>,
        ]}
        columns={columns}
        request={getTagList}
      />

      <Modal
        onOk={onSubmit}
        onCancel={() => setVisible(false)}
        open={visible}
        title="创建问题"
      >
        <Form form={form} className="mt-[20px]">
          <HideInput name="id" />
          <Form.Item rules={[{ required: true }]} label="标题" name="title">
            <Input maxLength={30} placeholder="请输入" />
          </Form.Item>
          <Form.Item label="描述" name="answer">
            <Input.TextArea rows={6} placeholder="请输入" />
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default List;
