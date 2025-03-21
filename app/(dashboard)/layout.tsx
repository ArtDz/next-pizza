import './globals.css'
import localFont from 'next/font/local'
import { ReactNode } from 'react'

const nunito = localFont({
  src: './fonts/Nunito.ttf',
  variable: '--font-nunito',
  weight: '400 500 600 700 800 900',
})

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body className={nunito.variable}>{children}</body>
    </html>
  )
}
