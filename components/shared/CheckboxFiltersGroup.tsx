'use client'
import {
  FilterCheckbox,
  FilterCheckboxProps,
} from '@/components/shared/FilterCheckbox'
import { ChangeEvent, FC, useState } from 'react'
import { Input, Skeleton } from '@/components/ui'

type Item = FilterCheckboxProps

interface Props {
  title?: string
  items: Item[]
  defaultItems?: Item[]
  limit?: number
  searchInputPlaceholder?: string
  onClickCheckbox?: (id: string) => void
  defaultValue?: string[]
  className?: string
  loading?: boolean
  selected?: Set<string>
  name?: string
}

const CheckboxFiltersGroup: FC<Props> = ({
  title,
  items,
  defaultItems,
  limit = 5,
  searchInputPlaceholder = 'Поиск...',
  onClickCheckbox,
  defaultValue,
  className,
  loading,
  selected,
  name,
}) => {
  const [showAll, setShowAll] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  if (loading) {
    return (
      <div className={className}>
        <p className='mb-3 font-bold'>{title}</p>

        {...Array(limit)
          .fill(0)
          .map((_, index) => <Skeleton key={index} className='mb-3 h-6' />)}
      </div>
    )
  }

  const list = showAll
    ? items.filter((el) =>
        el.text.toLowerCase().includes(searchValue.toLowerCase()),
      )
    : (defaultItems || items).slice(0, limit)

  const onChangeSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }

  return (
    <div className={className}>
      <p className='mb-3 font-bold'>{title}</p>

      {showAll && (
        <div className='mb-5'>
          <Input
            onChange={onChangeSearchInput}
            placeholder={searchInputPlaceholder}
            className='border-none bg-gray-50'
          />
        </div>
      )}

      <div className='scrollbar flex max-h-96 flex-col gap-4 overflow-auto pr-2'>
        {list.map((item, index) => (
          <FilterCheckbox
            name={name}
            key={index}
            text={item.text}
            value={item.value}
            endAdornment={item.endAdornment}
            checked={selected?.has(item.value)}
            onCheckedChange={() => onClickCheckbox?.(item.value)}
          />
        ))}
      </div>

      {items.length > limit && (
        <div className={showAll ? 'mt-4 border-t border-t-neutral-100' : ''}>
          <button
            onClick={() => setShowAll(!showAll)}
            className='mt-3 text-primary'
          >
            {showAll ? 'Скрыть' : '+ Показать все'}
          </button>
        </div>
      )}
    </div>
  )
}

export { CheckboxFiltersGroup }
