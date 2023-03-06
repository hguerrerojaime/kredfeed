import React from 'react';
import Client from '../client'
import PersonForm from './PersonForm';
import { Person } from '../types';


interface Properties {
  person?: Person
}

const CreateUser: React.FC<Properties> = () => {
  const client = new Client()
  const onSubmit = (person: Person) => {
    client.createUser(person)
  }

  return (
    <PersonForm onSubmit={onSubmit} /> 
  );
}

export default CreateUser
