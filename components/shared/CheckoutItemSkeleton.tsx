export const CheckoutItemSkeleton = () => {
  return (
    <div className='flex items-center justify-between'>
      <div className='flex items-center gap-5'>
        <div className='size-[50px] animate-pulse rounded-full bg-gray-200' />
        <h2 className='h-5 w-40 animate-pulse rounded bg-gray-200' />
      </div>
      <div className='h-5 w-10 animate-pulse rounded bg-gray-200' />
      <div className='h-8 w-[133px] animate-pulse rounded bg-gray-200' />
    </div>
  )
}
