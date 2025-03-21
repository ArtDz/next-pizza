import { axiosInstance } from '@/services/instance'
import { Product } from '@prisma/client'
import { Routes } from '@/constants/route'

export const search = async (query: string): Promise<Product[]> => {
  const { data } = await axiosInstance.get<Product[]>(Routes.ProductsSearch, {
    params: { query },
  })

  return data
}
