import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { Container, Header } from '@/components/shared'

export const metadata: Metadata = {
  title: 'Next Pizza | Оформление заказа',
  description: 'Страница оформления заказа',
}

export default function CheckoutLayout({ children }: { children: ReactNode }) {
  return (
    <main className='min-h-screen bg-[#f4f1ee]'>
      <Container>
        <Header hasSearch={false} hasCart={false} className='border-gray-200' />
        {children}
      </Container>
    </main>
  )
}
