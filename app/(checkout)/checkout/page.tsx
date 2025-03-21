'use client'

import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  CheckoutSidebar,
  Container,
  Title,
  CheckoutAddressForm,
  CheckoutCart,
  CheckoutPersonalForm,
} from '@/components/shared'
import { useCart } from '@/hooks'
import toast from 'react-hot-toast'
import { useState } from 'react'
import {
  checkoutFormSchema,
  CheckoutFormValues,
} from '@/lib/checkoutFormSchema'
import { createOrder } from '@/lib/actions/order.action'

export default function CheckoutPage() {
  const [submitting, setSubmitting] = useState(false)
  const { totalAmount, updateItemQuantity, items, removeCartItem, loading } =
    useCart()
  // const { data: session } = useSession()

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      comment: '',
    },
  })

  const onSubmit = async (data: CheckoutFormValues) => {
    console.log(data)
    try {
      setSubmitting(true)

      const url = await createOrder(data)

      toast.error('Заказ успешно оформлен! 📝 Переход на оплату... ', {
        icon: '✅',
      })

      if (url) {
        location.href = url
      }
    } catch (err) {
      console.log(err)
      setSubmitting(false)
      toast.error('Не удалось создать заказ', {
        icon: '❌',
      })
    }
  }

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: 'plus' | 'minus',
  ) => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1
    updateItemQuantity(id, newQuantity)
  }

  return (
    <Container className='mt-10'>
      <Title
        text='Оформление заказа'
        className='mb-8 text-[36px] font-extrabold'
      />

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='flex gap-10'>
            {/* Левая часть */}
            <div className='mb-20 flex flex-1 flex-col gap-10'>
              <CheckoutCart
                onClickCountButton={onClickCountButton}
                removeCartItem={removeCartItem}
                items={items}
                loading={loading}
              />

              <CheckoutPersonalForm
                className={loading ? 'pointer-events-none opacity-40' : ''}
              />

              <CheckoutAddressForm
                className={loading ? 'pointer-events-none opacity-40' : ''}
              />
            </div>

            {/* Правая часть */}
            <div className='w-[450px]'>
              <CheckoutSidebar
                totalAmount={totalAmount}
                loading={loading || submitting}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  )
}
