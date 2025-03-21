'use client'

import { FC, useEffect, useRef } from 'react'
import { Title } from '@/components/shared/Title'
import { cn } from '@/lib/utils'
import { ProductCard } from '@/components/shared/ProductCard'
import { useIntersection } from 'react-use'
import { useCategoryStore } from '@/store/category'
import { ProductWithRelations } from '@/@types/prisma'

interface Props {
  title: string
  items: ProductWithRelations[]
  categoryId: number
  className?: string
  listClassName?: string
}

export const ProductsGroupList: FC<Props> = ({
  title,
  items,
  categoryId,
  className,
  listClassName,
}) => {
  const setActiveCategoryId = useCategoryStore(
    (state) => state.setActiveCategoryId,
  )
  const intersectionRef = useRef<HTMLDivElement>(null)
  // @ts-ignore
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4,
  })

  useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId)
    }
  }, [intersection?.isIntersecting])

  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Title text={title} size='lg' className='mb-5 font-extrabold' />

      <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
        {items.map((item) => (
          <ProductCard
            id={item.id}
            key={item.id}
            name={item.name}
            imageUrl={item.imageUrl}
            price={item.variants?.[0].price}
            ingredients={item.ingredients}
          />
        ))}
      </div>
    </div>
  )
}
