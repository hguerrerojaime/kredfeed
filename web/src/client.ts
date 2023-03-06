import { BACKEND_URL } from './settings'
import { Person } from './types'

export default class Client {
  BASE_HEADERS: HeadersInit = {
    'Content-Type': 'application/json'
  }

  baseUrl: string

  constructor(baseUrl: string = BACKEND_URL || 'http://localhost:8080') {
    this.baseUrl = baseUrl
    console.log(this.baseUrl)
    console.log(baseUrl)
  }

  createUser(person: Person): Promise<Person> {
    return fetch(
      `${this.baseUrl}/person`,
      {
        method: 'POST',
        headers: this.BASE_HEADERS,
        body: JSON.stringify(person)
      }
    ).then(response => response.json())
  }

  getUser(id: string): Promise<Person> {
    console.log(`${this.baseUrl}/person/${id}`)

    return fetch(
      `${this.baseUrl}/person/${id}`,
      {
        headers: this.BASE_HEADERS
      }
    ).then(response => response.json())
  }
}
