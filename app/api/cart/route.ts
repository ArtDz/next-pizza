import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/prisma/prisma-client'
import { findOrCreateCart } from '@/lib'
import { CreateCartItemValues } from '@/store/cart'
import { updateCartTotalAmount } from '@/lib/update-cart-total-amount'

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('cartToken')?.value

    if (!token) {
      return NextResponse.json({ items: [], totalAmount: 0 })
    }

    const userCart = await prisma.cart.findFirst({
      where: {
        OR: [{ token }],
      },
      include: {
        items: {
          orderBy: { createdAt: 'desc' },
          include: {
            productVariant: { include: { product: true } },
            ingredients: true,
          },
        },
      },
    })

    return NextResponse.json(userCart)
  } catch (error) {
    console.log('[CART_GET] Server error', error)
    return NextResponse.json(
      { message: 'Не удалось получить корзину' },
      { status: 500 },
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get('cartToken')?.value

    if (!token) {
      token = crypto.randomUUID()
    }

    const userCart = await findOrCreateCart(token)

    const data = (await req.json()) as CreateCartItemValues
    // Todo здесь неправильно работает логика. Если добавить пиццу без ингредиентов, а затем с ингредиентами, то должно быть
    //  две разные пиццы в корзине. Но сейчас только одна.
    const findCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        productVariantId: data.productVariantId,
        ingredients: {
          every: {
            id: { in: data.ingredients },
          },
        },
      },
    })

    // Если товар был найден, делаем +1
    if (findCartItem) {
      await prisma.cartItem.update({
        where: {
          id: findCartItem.id,
        },
        data: {
          quantity: findCartItem.quantity + 1,
        },
      })
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productVariantId: data.productVariantId,
          quantity: 1,
          ingredients: { connect: data.ingredients?.map((id) => ({ id })) },
        },
      })
    }

    const updatedUserCart = await updateCartTotalAmount(token)

    const resp = NextResponse.json(updatedUserCart)
    resp.cookies.set('cartToken', token)
    return resp
  } catch (error) {
    console.log('[CART_POST] Server error', error)
    return NextResponse.json(
      { message: 'Не удалось создать корзину' },
      { status: 500 },
    )
  }
}
