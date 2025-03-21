'use server'

import { Prisma } from '@prisma/client'
import { prisma } from '@/prisma/prisma-client'
import { hashSync } from 'bcrypt'
import { sendEmail } from '@/lib'
import { VerificationUserTemplate } from '@/components/shared/email-temaplates/verification-user'
import { ReactNode } from 'react'

export async function registerUser(body: Prisma.UserCreateInput) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    })

    if (user) {
      if (!user.verified) {
        throw new Error('Почта не подтверждена')
      }

      throw new Error('Пользователь уже существует')
    }

    const createdUser = await prisma.user.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        password: hashSync(body.password, 10),
        verified: new Date(),
      },
    })

    const code = Math.floor(100000 + Math.random() * 900000).toString()

    await prisma.verificationCode.create({
      data: {
        code,
        userId: createdUser.id,
      },
    })

    await sendEmail(
      createdUser.email,
      'Next Pizza / 📝 Подтверждение регистрации',
      VerificationUserTemplate({
        code,
      }) as ReactNode,
    )
  } catch (err) {
    console.log('Error [CREATE_USER]', err)
    throw err
  }
}
