import { Title } from '@/components/shared/Title'
import { Button } from '@/components/ui'

interface Props {
  imageUrl: string
  name: string
  price: number
  loading?: boolean
  onSubmit?: VoidFunction
}

export const ChooseProductForm = ({
  imageUrl,
  name,
  price,
  loading,
  onSubmit,
}: Props) => {
  return (
    <div className='flex flex-1'>
      <div className='relative flex w-full flex-1 items-center justify-center'>
        <img
          src={imageUrl}
          alt={name}
          className='relative left-2 top-2 z-10 size-[350px] transition-all duration-300'
        />
      </div>
      <div className='w-[490px] bg-[#f7f6f5] p-7'>
        <Title text={name} size='md' className='mb-1 font-extrabold' />

        <Button
          loading={loading}
          onClick={() => onSubmit?.()}
          className='h-[55px] w-full rounded-[18px] px-10 text-base'
        >
          Добавить в корзину за {price}
        </Button>
      </div>
    </div>
  )
}
