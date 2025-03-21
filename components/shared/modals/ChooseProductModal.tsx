'use client'

import { Dialog } from '@/components/ui'
import { DialogContent } from '@/components/ui/dialog'
import { ProductForm } from '@/components/shared'
import { useRouter } from 'next/navigation'
import { ProductWithRelations } from '@/@types/prisma'

export const ChooseProductModal = ({
  product,
}: {
  product: ProductWithRelations
}) => {
  const router = useRouter()

  return (
    <Dialog open={Boolean(product)} onOpenChange={router.back}>
      <DialogContent className='min-h-[500px] w-[1060px] max-w-[1060px] overflow-hidden bg-white p-0'>
        <ProductForm product={product} onSubmit={() => router.back()} />
      </DialogContent>
    </Dialog>
  )
}
