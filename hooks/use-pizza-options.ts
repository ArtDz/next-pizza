'use client'

import { useEffect, useState } from 'react'
import { useSet } from 'react-use'
import { ProductVariant } from '@prisma/client'
import { PizzaSize, PizzaType } from '@/constants/pizza'
import { Variant } from '@/components/shared/GroupVariants'
import { getAvailablePizzaSizes } from '@/lib'

interface ReturnProps {
  size: PizzaSize
  type: PizzaType
  selectedIngredients: Set<number>
  availableSizes: Variant[]
  currentVariantId?: number
  setSize: (size: PizzaSize) => void
  setType: (size: PizzaType) => void
  addIngredient: (id: number) => void
}

export const usePizzaOptions = (variants: ProductVariant[]): ReturnProps => {
  const [size, setSize] = useState<PizzaSize>(20)
  const [type, setType] = useState<PizzaType>(1)
  const [selectedIngredients, { toggle: addIngredient }] = useSet(
    new Set<number>([]),
  )

  const availableSizes = getAvailablePizzaSizes(type, variants)

  const currentVariantId = variants.find(
    (item) => item.pizzaType === type && item.size === size,
  )?.id

  useEffect(() => {
    const isAvailableSize = availableSizes?.find(
      (item) => Number(item.value) === size && !item.disabled,
    )
    const availableSize = availableSizes?.find((item) => !item.disabled)

    if (!isAvailableSize && availableSize) {
      setSize(Number(availableSize.value) as PizzaSize)
    }
  }, [type])

  return {
    size,
    type,
    selectedIngredients,
    availableSizes,
    currentVariantId,
    setSize,
    setType,
    addIngredient,
  }
}
