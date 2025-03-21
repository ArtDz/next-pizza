import { axiosInstance } from '@/services/instance'
import { Ingredient } from '@prisma/client'
import { Routes } from '@/constants/route'

export const getAll = async (): Promise<Ingredient[]> => {
  const { data } = await axiosInstance.get<Ingredient[]>(Routes.Ingredients)

  return data
}
