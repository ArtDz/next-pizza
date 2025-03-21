import { CircleCheck } from 'lucide-react'
import React from 'react'
import { cn } from '@/lib/utils'

interface Props {
  imageUrl: string
  name: string
  price: number
  active?: boolean
  onClick?: () => void
  className?: string
}

export const IngredientItem: React.FC<Props> = ({
  className,
  active,
  price,
  name,
  imageUrl,
  onClick,
}) => {
  return (
    <div
      className={cn(
        'flex items-center flex-col p-1 rounded-md w-32 text-center relative cursor-pointer shadow-md bg-white border border-transparent',
        { 'border border-primary': active },
        className,
      )}
      onClick={onClick}
    >
      {active && (
        <CircleCheck className='absolute right-2 top-2 text-primary' />
      )}
      <img width={110} height={110} src={imageUrl} alt={name} />
      <span className='mb-1 text-xs'>{name}</span>
      <span className='font-bold'>{price} ₽</span>
    </div>
  )
}
