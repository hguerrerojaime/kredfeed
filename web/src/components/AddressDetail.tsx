import React from 'react';
import { Address } from '../types'

interface Properties {
  address?: Address
}

const AddressDetail: React.FC<Properties> = ({ address }) => {
  if (!address) return null

  const addressElements = [
    address.street,
    address.number
  ]

  if (address.interior) {
    addressElements.push(`Int. ${address.interior}`)
  }

  addressElements.push(`CP ${address.postalCode}`)
  addressElements.push(address.city)
  addressElements.push(address.country)

  return (
    <span>
      { addressElements.join(", ") }
    </span>
  );
}

export default AddressDetail
