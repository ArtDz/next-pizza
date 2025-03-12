import { Container, Filters, Title } from '@/components/shared'
import { TopBar } from '@/components/shared/TopBar'
import { ProductsGroupList } from '@/components/shared/ProductsGroupList'

const Home = () => {
  return (
    <>
      <Container className='mt-10'>
        <Title size='lg' text='Все пиццы' className='font-extrabold' />
      </Container>
      <TopBar />
      <Container className='mt-10 pb-14'>
        <div className='flex gap-[80px]'>
          <div className='w-[250px]'>
            <Filters />
          </div>

          <div className='flex-1'>
            <div className='flex flex-col gap-16'>
              <ProductsGroupList
                title='Пиццы'
                items={[1, 2, 3, 4, 5]}
                categoryId={1}
              />
              <ProductsGroupList
                title='Завтрак'
                items={[1, 2, 3, 4, 5]}
                categoryId={2}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default Home
