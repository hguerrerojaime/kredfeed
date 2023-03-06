import { useState } from 'react'
import { Person, Address } from '../types'
import { Form, Input, Button, Space } from 'antd';
import AddressForm from './AddressForm'

interface Properties {
  onSubmit: Function
}

const PersonForm: React.FC<Properties> = ({ onSubmit }) => {
  const [address, setAddress] = useState<Address>();
  const [lrAddress, setLrAddress] = useState<Address>()

  const onFinish = (values: Person) => {
    if (address) values.address = address

    if (values.legalRepresentative && lrAddress) {
      values.legalRepresentative.address = lrAddress
    }

    onSubmit(values)
  }

  return (
    <Form
      name="basic"
      labelCol={{ span: 2 }}
      wrapperCol={{ span: 22 }}
      onFinish={onFinish}
      autoComplete="on"
      onSubmitCapture={e => e.preventDefault()}
    >
      <strong>Base information</strong>
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Phone"
        name="phone"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, type: 'email' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Addess"
        name="address"
      >
        <AddressForm address={address} onSubmit={(value: Address) => setAddress(value)} />
      </Form.Item>
      <Space />
      <strong>Legal Representative</strong>
      <Form.Item
        label="Name"
        name="legalRepresentative.name"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Phone"
        name="legalRepresentative.phone"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Email"
        name="legalRepresentative.email"
        rules={[{ required: true, type: 'email' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Addess"
        name="legalRepresentative.address"
      >
        <AddressForm address={lrAddress} onSubmit={(value: Address) => setLrAddress(value)} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
}

export default PersonForm
