'use client'

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { FC, PropsWithChildren } from 'react'
import { useCartStore } from '@/store/cart'
import { CartContent, CartEmpty } from '@/components/shared'

export const CartDrawer: FC<PropsWithChildren> = ({ children }) => {
  const totalAmount = useCartStore((state) => state.totalAmount)

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className='flex flex-col justify-between bg-[#f4f1ee] pb-0'>
        {totalAmount > 0 ? <CartContent /> : <CartEmpty />}
      </SheetContent>
    </Sheet>
  )
}
