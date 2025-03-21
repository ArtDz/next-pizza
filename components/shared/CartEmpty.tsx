import { Title } from '@/components/shared/Title'
import { SheetClose } from '@/components/ui/sheet'
import { Button } from '@/components/ui'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'

export const CartEmpty = () => {
  return (
    <div className='mx-auto flex h-full w-72 flex-col items-center justify-center'>
      <Image
        src='/assets/images/empty-box.png'
        alt='Empty cart'
        width={120}
        height={120}
      />
      <Title
        size='sm'
        text='Корзина пустая'
        className='my-2 text-center font-bold'
      />
      <p className='mb-5 text-center text-neutral-500'>
        Добавьте хотя бы одну пиццу, чтобы совершить заказ
      </p>

      <SheetClose>
        <Button className='h-12 w-56 text-base' size='lg'>
          <ArrowLeft className='mr-2 w-5' />
          Вернуться назад
        </Button>
      </SheetClose>
    </div>
  )
}
