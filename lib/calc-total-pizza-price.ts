import { Ingredient, ProductVariant } from '@prisma/client'
import { PizzaSize, PizzaType } from '@/constants/pizza'

/**
 * Функция для подсчета общей стоимости пиццы
 *
 * @param type - тип теста выбранной пиццы
 * @param size - размер выбранной пиццы
 * @param variants - список вариаций
 * @param ingredients - список ингредиентов
 * @param selectedIngredients - выбранные ингредиенты
 *
 * @returns number общую стоимость
 */

export const calcTotalPizzaPrice = (
  type: PizzaType,
  size: PizzaSize,
  variants: ProductVariant[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>,
) => {
  const pizzaPrice =
    variants.find((item) => item.pizzaType === type && item.size === size)
      ?.price || 0

  const totalIngredientsPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0)

  return pizzaPrice + totalIngredientsPrice
}
