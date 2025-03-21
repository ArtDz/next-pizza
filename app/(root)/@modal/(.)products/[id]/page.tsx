import { prisma } from '@/prisma/prisma-client'
import { notFound } from 'next/navigation'
import { ChooseProductModal } from '@/components/shared'

const ProductsModalPage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params
  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
    include: {
      ingredients: true,
      // category: {
      //   include: {
      //     products: {
      //       include: {
      //         variants: true,
      //       },
      //     },
      //   },
      // },
      variants: true,
    },
  })

  if (!product) {
    return notFound()
  }

  return <ChooseProductModal product={product}></ChooseProductModal>
}

export default ProductsModalPage
