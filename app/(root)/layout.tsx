import type { Metadata } from 'next'
import { Header } from '@/components/shared/Header'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Next Pizza | Главная',
  description: 'Главная страница сайта',
}

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: ReactNode
  modal: ReactNode
}>) {
  return (
    <main className='min-h-screen'>
      <Header />
      {children}
      {modal}
    </main>
  )
}
