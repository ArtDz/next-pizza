'use client'

import {
  AuthModal,
  CartButton,
  Container,
  SearchInput,
} from '@/components/shared'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ProfileButton } from '@/components/shared/ProfileButton'
import { useState } from 'react'

interface Props {
  hasSearch?: boolean
  hasCart?: boolean
  className?: string
}

export const Header = ({
  hasSearch = true,
  hasCart = true,
  className,
}: Props) => {
  const [openAuthModal, setOpenAuthModal] = useState(false)

  return (
    <header className={cn('border-b', className)}>
      {/* Left Side */}
      <Container className='flex items-center justify-between py-8'>
        <Link href='/'>
          <div className='flex items-center gap-4'>
            <Image src='/logo.png' alt='logo' width={35} height={35} />
            <div>
              <h1 className='text-2xl font-black uppercase'>Next Pizza</h1>
              <p className='text-sm leading-3 text-gray-400'>
                вкусней уже некуда
              </p>
            </div>
          </div>
        </Link>

        {/* Center */}
        {hasSearch && (
          <div className='mx-10 flex-1'>
            <SearchInput />
          </div>
        )}

        {/* Right Side */}
        <div className='flex items-center gap-3'>
          <AuthModal
            open={openAuthModal}
            onClose={() => setOpenAuthModal(false)}
          />

          <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />

          {hasCart && <CartButton />}
        </div>
      </Container>
    </header>
  )
}
