import { getCategoryList } from '@/services/home/index';
import { PageContainer } from '@ant-design/pro-components';
import { useRequest } from 'ahooks';
import { Button, Card, Col, Row } from 'antd';

const HomePage: React.FC = () => {
  const { data } = useRequest(getCategoryList);
  const list = data?.data || [];
  return (
    <PageContainer ghost>
      <Button className="mb-[20px]" type="primary">
        创建标签
      </Button>
      <Row gutter={16}>
        {list.map((item) => (
          <Col className="mb-[20px]" key={item.id} span={8}>
            <Card title={item.title} bordered={false}>
              {item.desc}
            </Card>
          </Col>
        ))}
      </Row>
    </PageContainer>
  );
};

export default HomePage;
