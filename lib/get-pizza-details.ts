import { calcTotalPizzaPrice } from './calc-total-pizza-price'
import { Ingredient, ProductVariant } from '@prisma/client'
import { PizzaSize, PizzaType, mapPizzaType } from '@/constants/pizza'

export const getPizzaDetails = (
  type: PizzaType,
  size: PizzaSize,
  items: ProductVariant[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>,
) => {
  const totalPrice = calcTotalPizzaPrice(
    type,
    size,
    items,
    ingredients,
    selectedIngredients,
  )
  const textDetails = `${size} см, ${mapPizzaType[type]} пицца`

  return { totalPrice, textDetails }
}
