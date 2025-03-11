import {ReactNode} from 'react'
import {cn} from '@/lib/utils'

interface Props {
    children: ReactNode
    className?: string
}

const Container = ({children, className}: Props) => {
    return (
        <div className={cn('mx-auto max-w-[1280px]', className)}>
            {children}
        </div>
    )
}

export default Container
