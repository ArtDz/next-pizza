'use client'

import { Title } from '@/components/shared/Title'
import { Button } from '@/components/ui'
import { PizzaImage } from '@/components/shared/PizzaImage'
import { GroupVariants } from '@/components/shared/GroupVariants'
import { PizzaSize, PizzaType, pizzaTypes } from '@/constants/pizza'
import { Ingredient, ProductVariant } from '@prisma/client'
import { IngredientItem } from '@/components/shared'
import { usePizzaOptions } from '@/hooks'
import { getPizzaDetails } from '@/lib'

interface Props {
  imageUrl: string
  name: string
  ingredients: Ingredient[]
  variants: ProductVariant[]
  loading?: boolean
  onSubmit: (productVariantId: number, ingredients: number[]) => void
  onClickAddCart?: VoidFunction
}

export const ChoosePizzaForm = ({
  imageUrl,
  name,
  ingredients,
  variants,
  loading,
  onSubmit,
  onClickAddCart,
}: Props) => {
  const {
    size,
    type,
    selectedIngredients,
    currentVariantId,
    availableSizes,
    setSize,
    setType,
    addIngredient,
  } = usePizzaOptions(variants)

  const { totalPrice, textDetails } = getPizzaDetails(
    type,
    size,
    variants,
    ingredients,
    selectedIngredients,
  )

  const handleClickAdd = () => {
    if (currentVariantId)
      onSubmit?.(currentVariantId, Array.from(selectedIngredients))
    console.log({ size, type, ingredients: selectedIngredients })
  }

  return (
    <div className='flex flex-1'>
      <PizzaImage imageUrl={imageUrl} size={size} />
      <div className='w-[490px] bg-[#f7f6f5] p-7'>
        <Title text={name} size='md' className='mb-1 font-extrabold' />

        <p className='text-gray-400'>{textDetails}</p>

        <div className='my-4 flex flex-col gap-2'>
          <GroupVariants
            items={availableSizes}
            value={String(size)}
            onClick={(value) => setSize(Number(value) as PizzaSize)}
          />

          <GroupVariants
            items={pizzaTypes}
            value={String(type)}
            onClick={(value) => setType(Number(value) as PizzaType)}
          />
        </div>

        <div className='scrollbar grid h-[420px] grid-cols-3 gap-3 overflow-auto rounded-md bg-gray-50 p-5'>
          {ingredients.map((ingredient) => (
            <IngredientItem
              key={ingredient.id}
              {...ingredient}
              onClick={() => addIngredient(ingredient.id)}
              active={selectedIngredients.has(ingredient.id)}
            />
          ))}
        </div>

        <Button
          loading={loading}
          onClick={handleClickAdd}
          className='mt-5 h-[55px] w-full rounded-[18px] px-10 text-base'
        >
          Добавить в корзину за {totalPrice}
        </Button>
      </div>
    </div>
  )
}
