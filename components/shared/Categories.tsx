'use client'

import { cn } from '@/lib/utils'
import { useCategoryStore } from '@/store/category'
import { Category } from '@prisma/client'

interface Props {
  categories: Category[]
  className?: string
}

export const Categories = ({ className, categories }: Props) => {
  const activeCategoryId = useCategoryStore((state) => state.activeCategoryId)
  return (
    <div
      className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}
    >
      {categories.map(({ name, id }) => (
        <a
          key={id}
          className={cn(
            'flex items-center font-bold h-11 rounded-2xl px-5',
            activeCategoryId === id &&
              'bg-white shadow-md shadow-gray-200 text-primary',
          )}
          href={`/#${name}`}
        >
          <button>{name}</button>
        </a>
      ))}
    </div>
  )
}
