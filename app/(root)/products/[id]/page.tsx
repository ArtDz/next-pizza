import { prisma } from '@/prisma/prisma-client'
import { notFound } from 'next/navigation'
import { Container, ProductForm } from '@/components/shared'

const ProductsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params
  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
    include: {
      ingredients: true,
      category: {
        include: {
          products: {
            include: {
              variants: true,
            },
          },
        },
      },
      variants: true,
    },
  })

  if (!product) {
    return notFound()
  }

  return (
    <Container className='my-10 flex flex-col'>
      <ProductForm product={product} />
    </Container>
  )
}

export default ProductsPage
