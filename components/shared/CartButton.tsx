'use client'

import { ArrowRight, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui'
import { CartDrawer } from '@/components/shared/CartDrawer'
import { useCartStore } from '@/store/cart'
import { cn } from '@/lib/utils'

export const CartButton = () => {
  const totalAmount = useCartStore((state) => state.totalAmount)
  const items = useCartStore((state) => state.items)
  const loading = useCartStore((state) => state.loading)

  return (
    <CartDrawer>
      <Button
        loading={loading}
        className={cn('group relative', { 'w-[105px]': loading })}
      >
        <b>{totalAmount} ₽</b>
        <span className='mx-3 h-full w-px bg-white/30' />
        <div className='flex items-center gap-1 transition duration-300 group-hover:opacity-0'>
          <ShoppingCart className='relative size-4' strokeWidth={2} />
          <b>{items.length}</b>
        </div>
        <ArrowRight className='absolute right-5 w-5 -translate-x-2 opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100' />
      </Button>
    </CartDrawer>
  )
}
