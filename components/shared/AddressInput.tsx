'use client'

import React from 'react'
import { AddressSuggestions } from 'react-dadata'
import 'react-dadata/dist/react-dadata.css'

interface Props {
  onChange?: (value?: string) => void
}

export const AddressInput: React.FC<Props> = ({ onChange }) => {
  return (
    <AddressSuggestions
      token='f9b0d5acccb697b2a8cbac261f915bb22786f900'
      onChange={(data) => onChange?.(data?.value)}
    />
  )
}
