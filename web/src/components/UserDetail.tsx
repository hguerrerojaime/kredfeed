import React, { useState, useEffect } from 'react';
import Client from '../client'
import { Person } from '../types'
import { Card, Row, Col, Layout, Space } from 'antd';
import AddressDetail from  './AddressDetail'

const { Content } = Layout;

interface Properties {
  id: string
}


interface PersonProperties {
  person?: Person
}

const PersonDetail: React.FC<PersonProperties> = ({ person }) => {
  if (!person) return null

  return (
    <>
      <Row>
        <Col span={4}>
          Name
        </Col>
        <Col span={20}>
          { person?.name }
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          Phone
        </Col>
        <Col span={20}>
          { person?.phone }
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          Email
        </Col>
        <Col span={20}>
          { person?.email }
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          Name
        </Col>
        <Col span={20}>
          { person?.phone }
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          Address
        </Col>
        <Col span={20}>
          <AddressDetail address={person?.address} />
        </Col>
      </Row>
    </>
  )
}


const UserDetail: React.FC<Properties> = ({ id }) => {
  const [ user, setUser ] = useState<Person>();

  const client = new Client()

  useEffect(() => {
    client.getUser(id).then((user) => {
      setUser(user)
    })
  }, [])


  if (!user) return null

  return (
    <Card title="User Detail">
      <Content>
        <PersonDetail person={user} />
      </Content>
      <Space />
      <strong>Legal representative</strong>
      <Content>
        <PersonDetail person={user?.legalRepresentative} />
      </Content>
    </Card>
  )

}

export default UserDetail
