import { Container, Filters, Title } from '@/components/shared'
import { TopBar } from '@/components/shared/TopBar'
import { ProductsGroupList } from '@/components/shared/ProductsGroupList'
import { Suspense } from 'react'
import { findPizzas, GetSearchParams } from '@/lib/find-pizzas'

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<GetSearchParams>
}) => {
  const categories = await findPizzas(await searchParams)
  return (
    <>
      <Container className='mt-10'>
        <Title size='lg' text='Все пиццы' className='font-extrabold' />
      </Container>
      <TopBar categories={categories} />
      <Container className='mt-10 pb-14'>
        <div className='flex gap-[80px]'>
          <div className='w-[250px]'>
            <Suspense>
              <Filters />
            </Suspense>
          </div>

          <div className='flex-1'>
            <div className='flex flex-col gap-16'>
              {categories.map(
                (category) =>
                  category.products.length > 0 && (
                    <ProductsGroupList
                      key={category.id}
                      title={category.name}
                      categoryId={category.id}
                      items={category.products}
                    />
                  ),
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default Home
