import { HideInput } from '@/components';
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from '@/services/home';
import { getCategoryList } from '@/services/home/index';
import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { useRequest } from 'ahooks';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Modal,
  Popconfirm,
  Row,
  Tooltip,
} from 'antd';
import { useState } from 'react';

const { Meta } = Card;

const HomePage: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const { data, loading } = useRequest(getCategoryList);
  const list = data?.data || [];
  const onSubmit = async () => {
    const values = await form.validateFields();
    if (values.id) {
      await updateCategory(values);
    } else {
      await createCategory(values);
    }
    setVisible(false);
  };
  return (
    <PageContainer loading={loading} ghost>
      <Button
        onClick={() => setVisible(true)}
        className="mb-[20px]"
        type="primary"
      >
        创建标签
      </Button>
      <Row gutter={16}>
        {list.map((item) => (
          <Col className="mb-[20px]" key={item.id} span={8}>
            <Card
              bordered={false}
              actions={[
                <Popconfirm
                  key="delete"
                  title="确定要删除该标签？"
                  onConfirm={() => deleteCategory({ id: item.id })}
                >
                  <DeleteOutlined />
                </Popconfirm>,
                <Tooltip key="edit" title="编辑" placement="top">
                  <EditOutlined
                    onClick={() => {
                      form.setFieldsValue(item);
                      setVisible(true);
                    }}
                  />
                </Tooltip>,
                <Tooltip key="ellipsis" title="详情" placement="top">
                  <EllipsisOutlined
                    onClick={() => history.push('/detail')}
                    key="ellipsis"
                  />
                </Tooltip>,
              ]}
            >
              <Meta title={item.title} description={item.desc} />
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        onOk={onSubmit}
        onCancel={() => setVisible(false)}
        open={visible}
        title="创建标签"
      >
        <Form form={form} className="mt-[20px]">
          <HideInput name="id" />
          <Form.Item rules={[{ required: true }]} label="标题" name="title">
            <Input maxLength={20} placeholder="请输入" />
          </Form.Item>
          <Form.Item label="描述" name="desc">
            <Input maxLength={100} placeholder="请输入" />
          </Form.Item>
        </Form>
      </Modal>
    </PageContainer>
  );
};

export default HomePage;
