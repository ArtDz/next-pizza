import type { Metadata } from 'next'
import './globals.css'
import localFont from 'next/font/local'
import { Providers } from '@/components/shared'

const nunito = localFont({
  src: './fonts/Nunito.ttf',
  variable: '--font-nunito',
  weight: '400 500 600 700 800 900',
})

export const metadata: Metadata = {
  icons: '/logo.png',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={nunito.variable}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
