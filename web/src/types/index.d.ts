export interface Address {
  id?: string // This field is read only and autogenerated
  street: string
  number: string
  interior?: string
  postalCode: string
  city: string
  country: string
}

export interface Person {
  id?: string // This field is read only and autogenerated
  name: string
  phone?: string
  email?: string
  address: Address
  legalRepresentative?: Person
}
