'use client'

import { Api } from '@/services/api-client'
import { Ingredient } from '@prisma/client'
import { useEffect, useState } from 'react'

export const useIngredients = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Api.ingredients
      .getAll()
      .then((res) => {
        setLoading(true)
        setIngredients(res)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return {
    ingredients,
    loading,
  }
}
