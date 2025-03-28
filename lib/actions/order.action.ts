'use server'

import { CheckoutFormValues } from '@/lib/checkoutFormSchema'
import { prisma } from '@/prisma/prisma-client'
import { cookies } from 'next/headers'

import { OrderStatus } from '@prisma/client'
import { createPayment, sendEmail } from '@/lib'
import { PayOrderTemplate } from '@/components/shared'
import { ReactNode } from 'react'

export async function createOrder(data: CheckoutFormValues) {
  try {
    const cookiesStore = await cookies()
    const cartToken = cookiesStore.get('cartToken')?.value

    if (!cartToken) throw new Error('Cart token not found')

    /* Находим корзину по токену */
    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productVariant: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token: cartToken,
      },
    })

    if (!userCart) throw new Error('Cart not found')

    if (userCart?.totalAmount === 0) throw new Error('Cart is empty')

    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullName: data.firstName + ' ' + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items),
      },
    })

    await prisma.cart.update({
      where: { id: userCart.id },
      data: { totalAmount: 0 },
    })

    await prisma.cartItem.deleteMany({ where: { cartId: userCart.id } })

    const paymentData = await createPayment({
      amount: order.totalAmount,
      orderId: order.id,
      description: 'Оплата заказа #' + order.id,
    })

    console.log('paymentData', paymentData)

    if (!paymentData) {
      throw new Error('Payment data not found')
    }

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        paymentId: paymentData.id,
      },
    })

    const paymentUrl = paymentData.confirmation.confirmation_url

    await sendEmail(
      data.email,
      'Next Pizza / Оплатите заказ #' + order.id,
      PayOrderTemplate({
        orderId: order.id,
        totalAmount: order.totalAmount,
        paymentUrl,
      }) as ReactNode,
    )

    return paymentUrl
  } catch (error) {
    console.log('[CreateOrder] Server error', error)
  }
}
