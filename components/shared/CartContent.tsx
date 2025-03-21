'use client'

import { SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { getCartItemDetails } from '@/lib'
import { PizzaSize, PizzaType } from '@/constants/pizza'
import Link from 'next/link'
import { Routes } from '@/constants/route'
import { Button } from '@/components/ui'
import { ArrowRight } from 'lucide-react'
import { useCart } from '@/hooks'
import { CartDrawerItem } from '@/components/shared'
import { useState } from 'react'

export const CartContent = () => {
  const { totalAmount, updateItemQuantity, items, removeCartItem } = useCart()
  const [isRedirecting, setIsRedirecting] = useState(false)

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: 'plus' | 'minus',
  ) => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1
    console.log('id, newQuantity', id, newQuantity)
    updateItemQuantity(id, newQuantity)
  }

  return (
    <>
      <SheetHeader>
        <SheetTitle>
          В корзине <span className='font-bold'>{items.length} товара</span>
        </SheetTitle>
      </SheetHeader>
      <div className='-mx-6 mt-5 flex-1 overflow-auto '>
        {items.map((item) => (
          <div key={item.id} className='mb-2'>
            <CartDrawerItem
              id={item.id}
              imageUrl={item.imageUrl}
              details={getCartItemDetails(
                item.ingredients,
                item.pizzaType as PizzaType,
                item.pizzaSize as PizzaSize,
              )}
              disabled={item.disabled}
              name={item.name}
              price={item.price}
              quantity={item.quantity}
              onClickCountButton={(type) =>
                onClickCountButton(item.id, item.quantity, type)
              }
              onClickRemove={() => removeCartItem(item.id)}
            />
          </div>
        ))}
      </div>

      <SheetFooter className='-mx-6 bg-white p-8'>
        <div className='w-full'>
          <div className='mb-4 flex'>
            <span className='flex flex-1 text-lg text-neutral-500'>
              Итого
              <div className='relative -top-1 mx-2 flex-1 border-b border-dashed border-b-neutral-200'></div>
            </span>

            <span className='text-lg font-bold'>{totalAmount} ₽</span>
          </div>

          <Link href={Routes.Checkout}>
            <Button
              loading={isRedirecting}
              onClick={() => setIsRedirecting(true)}
              className='h-12 w-full text-base'
            >
              Оформить заказ
              <ArrowRight className='ml-2 w-5' />
            </Button>
          </Link>
        </div>
      </SheetFooter>
    </>
  )
}
