import Container from '@/components/shared/Container'
import Image from 'next/image'

const Header = () => {
    return (
        <header className='border-b'>
            <Container className='flex items-center justify-between py-8'>
                <div className='flex items-center gap-4'>
                    <Image src='/logo.png' alt='logo' width={35} height={35} />
                    <div>
                        <h1 className='text-2xl uppercase font-black'>Next Pizza</h1>
                        <p className='text-sm text-gray-400 leading-3'>вкусней уже некуда</p>
                    </div>
                </div>

            </Container>
        </header>
    )
}

export default Header
