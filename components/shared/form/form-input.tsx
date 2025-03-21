'use client'

import { useFormContext } from 'react-hook-form'
import { FC, InputHTMLAttributes } from 'react'
import { ClearButton, ErrorText, RequiredSymbol } from '@/components/shared'
import { Input } from '@/components/ui'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
  required?: boolean
  className?: string
}

export const FormInput: FC<Props> = ({
  className,
  name,
  label,
  required,
  ...props
}) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext()

  const value = watch(name)
  const errorText = errors[name]?.message as string

  const onClickClear = () => {
    setValue(name, '', { shouldValidate: true })
  }

  return (
    <div className={className}>
      {label && (
        <p className='mb-2 font-medium'>
          {label} {required && <RequiredSymbol />}
        </p>
      )}

      <div className='relative'>
        <Input className='text-md h-12' {...register(name)} {...props} />

        {value && <ClearButton onClick={onClickClear} />}
      </div>

      {errorText && <ErrorText text={errorText} className='mt-2' />}
    </div>
  )
}
