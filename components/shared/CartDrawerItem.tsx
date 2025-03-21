import * as CartItem from './cart-item-details'
import { FC } from 'react'
import { CartItemProps } from '@/components/shared/cart-item-details/cart-item-details.types'
import { CountButton } from '@/components/shared/CountButton'
import { Trash2Icon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props extends CartItemProps {
  onClickCountButton?: (type: 'plus' | 'minus') => void
  onClickRemove?: () => void
}

export const CartDrawerItem: FC<Props> = ({
  imageUrl,
  name,
  price,
  details,
  quantity,
  disabled,
  onClickCountButton,
  onClickRemove,
}) => {
  return (
    <div
      className={cn('flex gap-6 bg-white p-5', {
        'opacity-50 pointer-events-none': disabled,
      })}
    >
      <CartItem.Image src={imageUrl} />

      <div className='flex-1'>
        <CartItem.Info name={name} details={details} />

        <hr className='my-3' />

        <div className='flex items-center justify-between'>
          <CountButton onClick={onClickCountButton} value={quantity} />

          <div className='flex items-center gap-3'>
            <CartItem.Price value={price} />
            <Trash2Icon
              onClick={onClickRemove}
              className='cursor-pointer text-gray-400 hover:text-gray-600'
              size={16}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
