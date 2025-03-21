import { axiosInstance } from '@/services/instance'
import { Routes } from '@/constants/route'
import { CartDTO, CreateCartItemValues } from '@/services/dto/cart.dto'

export const getCart = async (): Promise<CartDTO> => {
  const { data } = await axiosInstance.get<CartDTO>(Routes.Cart)
  return data
}

export const updateItemQuantity = async (itemId: number, quantity: number) => {
  const { data } = await axiosInstance.patch<CartDTO>(
    `${Routes.Cart}/${itemId}`,
    {
      quantity,
    },
  )
  return data
}

export const removeCartItem = async (itemId: number): Promise<CartDTO> => {
  const { data } = await axiosInstance.delete<CartDTO>(
    `${Routes.Cart}/${itemId}`,
  )
  return data
}

export const addCartItem = async (
  values: CreateCartItemValues,
): Promise<CartDTO> => {
  const { data } = await axiosInstance.post<CartDTO>(Routes.Cart, values)
  return data
}
