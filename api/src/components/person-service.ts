import { PrismaClient } from '@prisma/client'
import { Person, Address } from '../types'
import { HttpException } from './exceptions'

// Class to handle person CRUD operations
export class PersonService {
  prisma: PrismaClient

  constructor(prisma: PrismaClient = new PrismaClient()) {
    this.prisma = prisma
  }

  async getPerson(id: string): Promise<Person> {
    const result = await this.prisma.person.findUnique({
      where: { id: id }
    })

    if (!result) {
      throw new HttpException(404, "Person not found")
    }

    let legalRepresentative: Person | undefined = undefined

    // If person is moral, load legal representative
    if (!result.physical) {
      legalRepresentative = await this.getPerson(result.legalRepresentativeId as string)
    }

    const address = await this.getPersonAddress(id)

    return {
      id,
      name: result?.name,
      email: result?.email,
      phone: result.phone,
      address,
      legalRepresentative
    } as Person

  }

  async getPersonAddress(personId: string): Promise<Address> {
    const result = await this.prisma.address.findFirst({
      where: { personId }
    })

    if (!result) {
      throw new HttpException(404, "Address not found")
    }

    return {
      id: result.id,
      street: result.street,
      number: result.number,
      interior: result.interior,
      postalCode: result.postalCode,
      city: result.city,
      country: result.country
    } as Address
  }

  async createPerson(person: Person) {
    const prisma = this.prisma
    return await prisma.$transaction(tx => this.txCreatePerson(person, tx as PrismaClient))
  }

  /* ----------------- Transaction wrapped methods -------------------------- */
  private async txCreatePerson(person: Person, tx: PrismaClient): Promise<Person> {
    let physical = !person.legalRepresentative
    let legalRepresentative: Person | undefined = person.legalRepresentative

    // if this is a moral person (has a legalRepresentative)
    // create it and get the id
    if (!physical) {
      // Avoid circular inserts
      // physical persons should not have legalRepresentatives
      legalRepresentative = { ...legalRepresentative, legalRepresentative: undefined } as Person
      legalRepresentative = await this.txCreatePerson(legalRepresentative, tx)
    }

    const result = await tx.person.create({
      data: {
        name: person.name,
        phone: person.phone,
        email: person.email,
        legalRepresentativeId: legalRepresentative?.id ? legalRepresentative?.id : undefined,
        physical
      }
    })

    person.id = result.id

    if (person.address) {
      const createdAddress = await this.txAddAddress(person, person.address, tx)
      person.address = createdAddress
    }

    return person
  }

  private async txAddAddress(person: Person, address: Address, tx: PrismaClient): Promise<Address> {
    const result = await tx.address.create({
      data: {
        street: address.street,
        number: address.number,
        interior: address.interior,
        postalCode: address.postalCode,
        city: address.city,
        country: address.country,
        personId: person.id as string
      }
    })

    address.id = result.id
    return address
  }
}
