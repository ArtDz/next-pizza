import React from 'react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Image from 'next/image'
import { Title } from '@/components/shared/Title'
import Link from 'next/link'
import { Routes } from '@/constants/route'
import { Ingredient } from '@prisma/client'

interface Props {
  id: number
  name: string
  price: number
  imageUrl: string
  className?: string
  ingredients: Ingredient[]
}

export const ProductCard: React.FC<Props> = ({
  id,
  name,
  price,
  imageUrl,
  className,
  ingredients,
}) => {
  return (
    <div className={className}>
      <Link href={Routes.Products(id)}>
        <div className='flex h-[260px] justify-center rounded-lg bg-secondary p-6'>
          <Image
            className='object-contain'
            src={imageUrl}
            alt='Logo'
            width={215}
            height={215}
          />
        </div>
        <Title text={name} size='sm' className='mb-1 mt-3 font-bold' />
        <p className='text-sm text-gray-400'>
          {ingredients.map((i) => i.name).join(', ')}
        </p>

        <div className='mt-4 flex items-center justify-between'>
          <span className='text-[20px]'>
            от <b>{price} ₽</b>
          </span>

          <Button variant='secondary'>
            <Plus className='mr-1 size-4' />
            Добавить
          </Button>
        </div>
      </Link>
    </div>
  )
}
