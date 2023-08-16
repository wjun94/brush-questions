import { Form, Input } from 'antd';

const HideInput = ({ name = 'id', ...props }) => {
  return (
    <Form.Item hidden={true} name={name} {...props}>
      <Input />
    </Form.Item>
  );
};

export default HideInput;
