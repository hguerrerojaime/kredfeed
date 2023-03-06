import { Address } from '../types'
import { Form, Input, Button } from 'antd';

interface Properties {
  address?: Address
  onSubmit: Function
}

const AddressForm: React.FC<Properties> = ({ address, onSubmit }) => {
  const initialValues = address || {}

  return (
    <Form
      name="basic"
      layout="inline"
      labelCol={{ span: 2 }}
      wrapperCol={{ span: 22 }}
      initialValues={initialValues}
      onFinish={(values: any) => onSubmit(values)}
      autoComplete="on"
      onSubmitCapture={e => e.preventDefault()}
    >
      <Form.Item
        name="street"
        rules={[{ required: true }]}
      >
        <Input placeholder="Street" />
      </Form.Item>
      <Form.Item
        name="number"
        rules={[{ required: true }]}
      >
        <Input placeholder="Number" />
      </Form.Item>
      <Form.Item
        name="interior"
        rules={[{ required: false }]}
      >
        <Input placeholder="Interior" />
      </Form.Item>
      <Form.Item
        name="postalCode"
        rules={[{ required: true }]}
      >
        <Input placeholder="Postal Code" />
      </Form.Item>
      <Form.Item
        name="city"
        rules={[{ required: true }]}
      >
        <Input placeholder="City" />
      </Form.Item>
      <Form.Item
        name="country"
        rules={[{ required: true }]}
      >
        <Input placeholder="Country" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
}

export default AddressForm
