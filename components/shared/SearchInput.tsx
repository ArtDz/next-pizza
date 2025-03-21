'use client'

import { Search } from 'lucide-react'
import { useRef, useState } from 'react'
import { useClickAway, useDebounce } from 'react-use'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'
import { Api } from '@/services/api-client'
import { Product } from '@prisma/client'
import { Routes } from '@/constants/route'

export const SearchInput = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const ref = useRef(null)

  useClickAway(ref, () => {
    setFocused(false)
  })

  useDebounce(
    () => {
      Api.products.search(searchQuery).then((res) => setProducts(res))
    },
    300,
    [searchQuery],
  )

  const onProductClick = () => {
    setFocused(false)
    setSearchQuery('')
    setProducts([])
  }

  return (
    <>
      {focused && <div className='fixed inset-0 z-30 bg-black/50' />}

      <div
        ref={ref}
        className='relative z-30 flex h-11 flex-1 justify-between rounded-2xl'
      >
        <Search className='absolute left-3 top-1/2 h-3 -translate-y-1/2 text-gray-400' />
        <input
          type='text'
          className='w-full rounded-2xl bg-gray-100 pl-11 outline-none'
          placeholder='Найти пиццу'
          onFocus={() => setFocused(true)}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div
          className={cn(
            'absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30',
            focused && 'visible opacity-100 top-12',
          )}
        >
          {products.length > 0 &&
            products.map((product) => (
              <Link
                onClick={onProductClick}
                key={product.id}
                className='flex w-full items-center gap-3 px-3 py-2 hover:bg-primary/10'
                href={Routes.Products(product.id)}
              >
                <Image
                  width={14}
                  height={14}
                  className='size-8 rounded-sm'
                  src={product.imageUrl}
                  alt={product.name}
                />
                <span>{product.name}</span>
              </Link>
            ))}
        </div>
      </div>
    </>
  )
}
