'use client'

import { ProductWithRelations } from '@/@types/prisma'
import toast from 'react-hot-toast'
import { FC } from 'react'
import { useCartStore } from '@/store/cart'
import { ChoosePizzaForm } from '@/components/shared/ChoosePizzaForm'
import { ChooseProductForm } from '@/components/shared/ChooseProductForm'

interface Props {
  product: ProductWithRelations
  onSubmit?: VoidFunction
}

export const ProductForm: FC<Props> = ({ product, onSubmit: _onSubmit }) => {
  const addCartItem = useCartStore((state) => state.addCartItem)
  const loading = useCartStore((state) => state.loading)

  const firstItem = product.variants[0]
  const isPizzaForm = Boolean(firstItem.pizzaType)

  const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
    try {
      const itemId = productItemId ?? firstItem.id

      await addCartItem({
        productVariantId: itemId,
        ingredients,
      })

      toast.success(product.name + ' добавлена в корзину')

      _onSubmit?.()
    } catch (err) {
      toast.error('Не удалось добавить товар в корзину')
      console.error(err)
    }
  }

  if (isPizzaForm) {
    return (
      <ChoosePizzaForm
        imageUrl={product.imageUrl}
        name={product.name}
        ingredients={product.ingredients}
        variants={product.variants}
        onSubmit={onSubmit}
        loading={loading}
      />
    )
  }

  return (
    <ChooseProductForm
      imageUrl={product.imageUrl}
      name={product.name}
      onSubmit={onSubmit}
      price={firstItem.price}
      loading={loading}
    />
  )
}
